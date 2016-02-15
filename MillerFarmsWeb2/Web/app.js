
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
    loadData();
    $scope.Mode = "home";
    $scope.Message = "";
    $scope.CurrentWeight = 0.00;
    $scope.Directions = ['Inbound','Outbound'];
      
    //Button Click Methods For Pages
    
    $scope.cancelClick = function () {
        $scope.Ticket = new Object();
        $scope.selectedOpenTicket = new Object();
        $scope.Mode = "home";
    };
    

    $scope.newTicketClick = function () {
        $scope.Ticket = new Object();
        $scope.Mode = "inbound";
        UpdateWeight();
    };

    $scope.inboundClick = function (isValid) {
        if(isValid)
        {
	    $scope.Ticket.Splits1 = 100;
            $scope.Mode = "fields";
            UpdateWeight();
        }
    };
    
    $scope.fieldformClick = function (isValid) {
        if(isValid)
        {
            UpdateWeight();
            $scope.Ticket.InWeight = $scope.CurrentWeight;
            $scope.Ticket.Completed = false;
            $scope.Ticket.InDate = new Date().toUTCString();
            
            //Set Base Field and Splits based on Input 1 which is required
            $scope.Ticket.Field = $scope.Ticket.Field1.Name;
            $scope.Ticket.Splits = $scope.Ticket.Splits1;
            
            if(!angular.isUndefined($scope.Ticket.Field2))
            {
                $scope.Ticket.Field = $scope.Ticket.Field + "|" + $scope.Ticket.Field2.Name;
            }
            if(!angular.isUndefined($scope.Ticket.Field3))
            {
                $scope.Ticket.Field = $scope.Ticket.Field + "|" + $scope.Ticket.Field3.Name;
            }
            
            if(!angular.isUndefined($scope.Ticket.Splits2))
            {
                $scope.Ticket.Splits = $scope.Ticket.Splits + "|" + $scope.Ticket.Splits2;
            }
            if(!angular.isUndefined($scope.Ticket.Splits3))
            {
                $scope.Ticket.Splits = $scope.Ticket.Splits + "|" + $scope.Ticket.Splits3;
            }
          
            
            $scope.Mode = "confirminbound";
        }
    };

    $scope.outboundClick = function (isValid) {
        UpdateWeight();
        
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
            $scope.Ticket.OutDate = new Date().toUTCString();
            $scope.Ticket.Completed = true;
        }
    };

    $scope.saveInboundClick = function () {
        $scope.Ticket.InWeight = $scope.CurrentWeight;
        AddTicket();
	    $scope.Message = "Please Proceed To Loading/Unloading";
        $scope.Mode = "thanks";
        refresh();
    };

    $scope.Nap = function (delay) {
        var start = new Date().getTime();
        while (new DateTime().getTime() < start + delay);
    }

    $scope.saveOutboundClick = function () {
        SetTicketNumber();
        $scope.Message = "Ticket Saved";
        $scope.Mode = "thanks";
        refresh();
    };

    $scope.LoadTicket = function () {
        UpdateWeight();
        $scope.Ticket = $scope.selectedOpenTicket;
        $scope.Mode = "outbound";
    }

    $scope.thanksClick = function () {

    };
    
    $scope.GetGrossWeight = function(){
        Scales.GetGross("A", function(result) {$scope.CurrentWeight = result; }, function(msg) { gross = 0;});
    }
    



    function loadOpenTickets() {
        Database.GetData("MillerFarms.sdf", "SELECT * FROM [Ticket] WHERE [Completed] = 0",
		function(result) 
		{	
            $scope.OpenTickets = JSON.parse(result);
            $scope.mode = "home"; 
		},
		function(msg) { alert(msg.getErrorMessage()); }
		)
    }
    
    function RemoveTicketFromList(){
        for (var i =0; i < $scope.OpenTickets.length; i++)
            var OpenTicketTruck = $scope.OpenTickets[i].Truck.toString();
            var CurrentTicketTruck = $scope.Ticket.Truck.toString();
         
            alert(OpenTicketTruck + "-" + CurrentTicketTruck);
            if (OpenTicketTruck == CurrentTicketTruck) 
            {
                $scope.OpenTickets.splice(i,1);
                alert("Gotcha");
            }
    }
            
    //ideally there would be a service call to handle this. 
    function loadData() {
        
        Channel = new RemObjects.SDK.HTTPClientChannel("http://192.168.1.8:8095/JSON");
        Message = new RemObjects.SDK.JSONMessage();
        Database = new DatabaseService(Channel, Message);
        Scales = new ScaleService(Channel, Message);
        Printer = new PrintService(Channel, Message);
	
       
    Database.GetData("MillerFarms.sdf", "SELECT * FROM [Ticket] WHERE [Completed] = 0",
		function(result) 
		{	
            $scope.OpenTickets = JSON.parse(result);
		},
		function(msg) { alert(msg.getErrorMessage()); }
		)
       
    Database.GetData("MillerFarms.sdf", "SELECT * FROM [Commodity]",
		function(result) 
		{	
            $scope.Commodities = JSON.parse(result);
		},
		function(msg) { alert(msg.getErrorMessage()); }
		);
    
    Database.GetData("MillerFarms.sdf", "SELECT * FROM [Farm]",
		function(result) 
		{	
            $scope.Farms = JSON.parse(result);
		},
		function(msg) { alert(msg.getErrorMessage()); }
		);

    Database.GetData("MillerFarms.sdf", "SELECT * FROM [Field]",
		function(result) 
		{	
            $scope.Fields = JSON.parse(result);
		},
		function(msg) { alert(msg.getErrorMessage()); }
		);

    Database.GetData("MillerFarms.sdf", "SELECT * FROM [Truck]",
		function(result) 
		{	
            $scope.Trucks = JSON.parse(result);
		},
		function(msg) { alert(msg.getErrorMessage()); }
		);    
         
    }
    
    function UpdateWeight(){
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
          Database.AppendUpdate("MillerFarms.sdf","DD2050_Farm_MillerFarms.BusinessObjects.Models.Ticket",JSON.stringify(new OUTscaleticket()),
                               function(){PrintTicket();},
                               function(){});  
        } catch (e) {
          alert(e);
        }  
      }
    
    function INscaleticket()
    {
       this.Oid = guid();
       this.Farm = $scope.Ticket.Farm.Name;
       this.Field = $scope.Ticket.Field;
       this.Truck = $scope.Ticket.Truck.Name;
       this.IsActive = true;
       this.Completed = false;
       this.Splits = $scope.Ticket.Splits.toString();
       this.Direction = $scope.Ticket.Direction;
       this.Commodity = $scope.Ticket.Commodity.Name;
       this.StandardMoisture = $scope.Ticket.Commodity.StandardMoisture;
       this.Inbound = $scope.Ticket.InWeight.toString();
       this.InboundTimeDate = $scope.Ticket.InDate;
        
        //Add Moisture            
        if(!angular.isUndefined($scope.Ticket.Moisture))
        {
          this.Moisture = $scope.Ticket.Moisture;
        }
        
        //Add Test Weight        
        if(!angular.isUndefined($scope.Ticket.TestWeight))
        {
          this.TestWeight = $scope.Ticket.TestWeight;
        }
        
    }
    
    function OUTscaleticket()
    {
       this.Oid = $scope.Ticket.Oid;
       this.Farm = $scope.Ticket.Farm;
       this.Field = $scope.Ticket.Field;
       this.Truck = $scope.Ticket.Truck;
       this.Splits = $scope.Ticket.Splits.toString();
       this.Direction = $scope.Ticket.Direction;
       this.Commodity = $scope.Ticket.Commodity;
       this.StandardMoisture = $scope.Ticket.StandardMoisture;
       this.Inbound = $scope.Ticket.InWeight.toString();
       this.InboundTimeDate = $scope.Ticket.InboundTimeDate;
       this.IsActive = true;
       this.Completed = true;
       this.OutboundTimeDate = $scope.Ticket.OutDate;
       this.Outbound = $scope.Ticket.OutWeight.toString();
       this.Moisture = $scope.Ticket.Moisture;
       this.TestWeight = $scope.Ticket.TestWeight;
       this.TicketNumber = $scope.Ticket.TicketNumber.toString();
    }
    
    function AddTicket()
      {
        try
        { 
            
        var ticket = new INscaleticket();
            
        Database.AppendUpdate("MillerFarms.sdf","DD2050_Farm_MillerFarms.BusinessObjects.Models.Ticket",JSON.stringify(ticket),
                               function(){},
                               function(){});  
        } catch (e) {
          alert(e);
        }  
      }
     
    function guid() 
    {
          function _p8(s) {
              var p = (Math.random().toString(16)+"000000000").substr(2,8);
              return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
          }
          return _p8() + _p8(true) + _p8(true) + _p8();
    }
    
    function refresh() {

        setTimeout(function () {
            $scope.mode = "home";
            this.location.reload()
        }, 2000);
    }
    
    function SetTicketNumber()
    {
        var SQLStatement = "";
        
        if($scope.Ticket.Commodity === "CORN" || $scope.Ticket.Commodity === "WHEAT" || $scope.Ticket.Commodity === "SOYBEAN")
        {
            if($scope.Ticket.Direction === "Inbound")
            {
                SQLStatement = "SELECT * FROM [Sequencer] WHERE [SeqName] = 'InboundCommodity'";
            }
            else
            {
                SQLStatement = "SELECT * FROM [Sequencer] WHERE [SeqName] = 'OutboundCommodity'";
            }
        }
        else
        {
            SQLStatement = "SELECT * FROM [Sequencer] WHERE [SeqName] = 'Other'";
        }
        
        Database.GetData("MillerFarms.sdf", SQLStatement,
		  function(result) 
		  {
                $scope.Sequences = JSON.parse(result);
                $scope.Sequence = $scope.Sequences[0];
                var number = $scope.Sequence.SeqNumber;
                $scope.Ticket.TicketNumber = $scope.Sequence.SeqNumber + 1;
                UpdateTicket();
                UpdateSequence();
		  },
		  function(msg) { alert("Failed To Set Ticket Number"); }
		  );                
    }
    
    function UpdateSequence()
    {
        //Initialize The Keys and Paramaters
          var keys = new Array();
          var params = new Array();
        
        //Add GUID Key
          var param = new Parameter();

          param.Name = "Oid";
          param.DataType = "System.Guid";
          param.Value = $scope.Sequence.Oid;
                  
          keys.push(param);
            
        //Add Seq Number
          param = new Parameter();

          param.Name = "SeqNumber";
          param.DataType = "System.Int32";
          param.Value = $scope.Ticket.TicketNumber.toString();
                  
          params.push(param);
               
        Database.UpdateRecords("MillerFarms.sdf", "Sequencer", params, keys,
              function(result) 
              { 
              }, 
              function(msg) {});

    }
    
    function PrintTicket(){
      try
      {
          var params = new Array();

        //Add GUID Key
          var param = new Parameter();

          param.Name = "Oid";
          param.DataType = "System.Guid";
          param.Value = $scope.Ticket.Oid;

          params.push(param);
                  
          Printer.PrintBusinessObject("MillerFarms.sdf","DD2050_Farm_MillerFarms.BusinessObjects.Models.Ticket", params, "\\NAND_Flash\\Extern\\TicketFormats\\OutboundFromWeb.txt",function(result){alert(result);},function(){})
      }
          catch(err)
          {
            alert(err.Message);
          }
    }
    
    
});