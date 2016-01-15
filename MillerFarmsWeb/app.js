
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
    $scope.OpenTickets = [];
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
            $scope.Ticket.Completed = false;
            $scope.Ticket.InDate = new Date().toLocaleDateString();
        }
    };

    $scope.outboundClick = function (isValid) {

        if(isValid)
        {
            $scope.Ticket.OutWeight = $scope.CurrentWeight;
            $scope.Ticket.InWeight = $scope.Ticket.Inbound;

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
            $scope.Ticket.OutDate = new Date().toLocaleDateString();
            $scope.Ticket.Completed = true;
        }
    };

    $scope.saveInboundClick = function () {
        $scope.Mode = "thanks";
        AddTicket();
        loadOpenTickets();
    };

    $scope.saveOutboundClick = function () {
        UpdateTicket();
        $scope.selectedOpenTicket = [];
        loadOpenTickets();
        $scope.Ticket = [];
        $scope.Mode = "thanks";
    };

    $scope.LoadTicket = function () {
        $scope.Ticket = $scope.selectedOpenTicket;
        $scope.Mode = "outbound";
    }

    $scope.thanksClick = function () {
        $scope.Mode = "home";
    };
    
    $scope.GetGrossWeight = function(){
        Scales.GetGross("A", function(result) { alert(result); $scope.CurrentWeight = result; }, function(msg) { gross = 0;});
    }
    
    function loadOpenTickets() {
        Database.GetData("TruckIO.sdf", "SELECT * FROM [Ticket] WHERE [Completed] = 0",
		function(result) 
		{	
            $scope.OpenTickets = JSON.parse(result);
		},
		function(msg) { alert(msg.getErrorMessage()); }
		)
    }
            
    //ideally there would be a service call to handle this. 
    function loadData() {
        
        Channel = new RemObjects.SDK.HTTPClientChannel("http://192.168.34.14:8095/JSON");
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

    loadOpenTickets();
        
    setInterval(UpdateWeight, 1000);
        
    }
    
    function UpdateWeight()
      {
        try
        {
          var str = "{0} {1}";
            Scales.GetGross("A", function(result) { gross = result; }, function(msg) { gross = -1; });
            $scope.CurrentWeight = gross;
        } catch (e) {
          alert(e);
        }  
      }
    
    function UpdateTicket()
      {
        try
        {
         
        //Initialize The Keys and Paramaters
          var keys = new Array();
          var params = new Array();
        
        //Add GUID Key
          var param = new Parameter();

          param.Name = "Oid";
          param.DataType = "System.Guid";
          param.Value = $scope.Ticket.Oid;
            
          keys.push(param);
            
        //Add Outbound Time
          param = new Parameter();

          param.Name = "OutboundTimeDate";
          param.DataType = "System.DateTime";
          param.Value = $scope.Ticket.OutDate;

          params.push(param);
            
          param = new Parameter();
        //Toggle Completed Boolean
            
          param.Name = "Completed";
          param.DataType = "System.Boolean";
          param.Value = "true";
        
          params.push(param);
            
        //Add Outbound Weight
            
          param = new Parameter();

          param.Name = "Outbound";
          param.DataType = "System.Double";
          param.Value = $scope.Ticket.OutWeight;

          params.push(param);

        //Add Moisture
            
          param = new Parameter();

          param.Name = "Moisture";
          param.DataType = "System.Double";
          param.Value = $scope.Ticket.Moisture;

          params.push(param);
            
        //Add Test Weight
         
          param = new Parameter();

          param.Name = "TestWeight";
          param.DataType = "System.Double";
          param.Value = $scope.Ticket.TestWeight;

          params.push(param);
            
        Database.UpdateRecords("TruckIO.sdf", "Ticket", params, keys,
              function(result) 
              { 
                  var response = result.toObject();
              }, 
              function(msg) { alert("Fail"); });

        } catch (e) {
          alert(e);
        }  
      }
    
    function AddTicket()
      {
        try
        {
          var params = new Array();

          var param = new Parameter();

          param.Name = "Oid";
          param.DataType = "System.Guid";
          param.Value = guid();

          params.push(param);
            
          param = new Parameter();

          param.Name = "Completed";
          param.DataType = "System.Boolean";
          param.Value = "false";
        
          params.push(param);

          param = new Parameter();

          param.Name = "Truck";
          param.DataType = "System.String";
          param.Value = $scope.Ticket.Truck.Name;

          params.push(param);

          param = new Parameter();

          param.Name = "Farm";
          param.DataType = "System.String";
          param.Value = $scope.Ticket.Farm.Name;
            
          params.push(param);
            
          param = new Parameter();
            
          param.Name = "Field";
          param.DataType = "System.String";
          param.Value = $scope.Ticket.Field.Name;

          params.push(param);
            
          param = new Parameter();
            
          param.Name = "Commodity";
          param.DataType = "System.String";
          param.Value = $scope.Ticket.Commodity.Name;

          params.push(param);
            
          param = new Parameter();
            
          param.Name = "Inbound";
          param.DataType = "System.Double";
          param.Value = $scope.Ticket.InWeight;

          params.push(param);
            
          param = new Parameter();
            
          param.Name = "InboundTimeDate";
          param.DataType = "System.DateTime";
          param.Value = $scope.Ticket.InDate;

          params.push(param);

          Database.AppendRecord("TruckIO.sdf", "Ticket", params, 
              function(result) 
              { 
                  var response = result.toObject();
              }, 
              function(msg) { alert("Fail"); });

        } catch (e) {
          alert(e);
        }  
      }
     
        function guid() {
          function _p8(s) {
              var p = (Math.random().toString(16)+"000000000").substr(2,8);
              return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
          }
          return _p8() + _p8(true) + _p8(true) + _p8();
      }


});