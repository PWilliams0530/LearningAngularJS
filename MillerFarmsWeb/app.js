
var app = angular.module('FarmApp', []);

"use-strict";
app.controller('DataController', function ($scope) {
    
    //REM Objects Variables
    var Channel;
    var Message;
    var Scales;
    var Settings;
    var Database;
    var gross = 0;
    
    
    //Initialize The Scope Variables
    $scope.Mode = "home";
    $scope.CurrentWeight = 0.00;
    $scope.Ticket = [];
    $scope.selectedOpenTicket = [];
    $scope.Commodities = [];
    loadData();
      
    //Button Click Methods For Pages
    
    $scope.cancelClick = function () {
        $scope.Ticket = [];
        $scope.selectedOpenTicket = [];
        $scope.Mode = "home";
    };
    

    $scope.newTicketClick = function () {
        $scope.Ticket = [];
        $scope.Mode = "inbound";
    };

    $scope.inboundClick = function (isValid) {
        if(isValid)
        {
            $scope.Ticket.InWeight = $scope.CurrentWeight;
            $scope.Mode = "confirminbound";
        }
    };

    $scope.outboundClick = function (isValid) {

        if(isValid)
        {
            $scope.Ticket.OutWeight = $scope.CurrentWeight;

            if ($scope.Ticket.InWeight > $scope.Ticket.OutWeight) {
                $scope.Ticket.Gross = $scope.Ticket.InWeight;
                $scope.Ticket.Tare = $scope.Ticket.OutWeight;
        }
            else {
                $scope.Ticket.Gross = $scope.Ticket.OutWeight;
                $scope.Ticket.Tare = $scope.Ticket.InWeight;
            }
            $scope.Ticket.Net = $scope.Ticket.Gross - $scope.Ticket.Tare;

            $scope.Mode = "confirmoutbound";
        }
    };

    $scope.saveInboundClick = function () {
        $scope.Mode = "thanks";
        $scope.OpenTickets.push($scope.Ticket);
    };

    $scope.saveOutboundClick = function () {
        $scope.Mode = "thanks";
    };

    $scope.LoadTicket = function () {
        $scope.Ticket = $scope.selectedOpenTicket;
        $scope.Mode = "outbound";
    }

    $scope.thanksClick = function () {
        $scope.Mode = "home";
        $scope.init();
    };
    
    $scope.GetGrossWeight = function(){
        Scales.GetGross("A", function(result) { alert(result); $scope.CurrentWeight = result; }, function(msg) { gross = 0;});
    }

    //ideally there would be a service call to handle this. 
    function loadData() {
        
        Channel = new RemObjects.SDK.HTTPClientChannel("http://192.168.34.164:8095/JSON");
        Message = new RemObjects.SDK.JSONMessage();
        Database = new DatabaseService(Channel, Message);
        Scales = new ScaleService(Channel, Message);
       
    Database.GetData("TruckIO.sdf", "SELECT * FROM [Commodity]",
		function(result) 
		{	
            $scope.Commodities = JSON.parse(result);
		},
		function(msg) { alert(msg.getErrorMessage()); }
		);
    
    Database.GetData("TruckIO.sdf", "SELECT * FROM [Farm]",
		function(result) 
		{	
            $scope.Farms = JSON.parse(result);
		},
		function(msg) { alert(msg.getErrorMessage()); }
		);

    Database.GetData("TruckIO.sdf", "SELECT * FROM [Field]",
		function(result) 
		{	
            $scope.Fields = JSON.parse(result);
		},
		function(msg) { alert(msg.getErrorMessage()); }
		);

    Database.GetData("TruckIO.sdf", "SELECT * FROM [Truck]",
		function(result) 
		{	
            $scope.Trucks = JSON.parse(result);
		},
		function(msg) { alert(msg.getErrorMessage()); }
		);

    Database.GetData("TruckIO.sdf", "SELECT * FROM [Ticket] WHERE Completed = 0",
		function(result) 
		{	
            $scope.OpenTickets = JSON.parse(result);
		},
		function(msg) { alert(msg.getErrorMessage()); }
		);
        
    setInterval(UpdateWeight, 1000);
        
    }
    
    function UpdateWeight()
      {
        try
        {
          var str = "{0} {1}";
            Scales.GetGross("A", function(result) { gross = result; }, function(msg) { gross = -1; });
            $scope.CurrentWeight = gross;
            alert($scope.CurrentWeight);
        } catch (e) {
          alert(e);
        }  
      }
});