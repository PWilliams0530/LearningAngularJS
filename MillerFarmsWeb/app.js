
var app = angular.module('FarmApp', []);

"use-strict";
app.controller('DataController', function ($scope) {
    
    //Initialize The Scope Variables
    $scope.Mode = "home";
    $scope.Ticket = [];
    $scope.selectedOpenTicket = [];
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
            $scope.Ticket.InWeight = Math.floor((Math.random() * 10000) + 1);
            $scope.Mode = "confirminbound";
        }
    };

    $scope.outboundClick = function (isValid) {

        if(isValid)
        {
            $scope.Ticket.OutWeight = Math.floor((Math.random() * 10000) + 1);

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

    //ideally there would be a service call to handle this. 
    function loadData() {
        
        $scope.OpenTickets = [];

        $scope.Commodities = [{ "Name": "Corn", "BushelWeight": 56.00000, "StandardMoisture": 15.00000, "IsActive": true, "Oid": "5dea752f-a7d9-4e1a-a1f4-6a115bb5239a" }, { "Name": "WHEAT", "BushelWeight": 5.00000, "StandardMoisture": 5.00000, "IsActive": true, "Oid": "ebbb7330-cd0f-436d-8ac2-60e9d35898d8" }, { "Name": "SOY BEANS", "BushelWeight": 2.00000, "StandardMoisture": 8.00000, "IsActive": true, "Oid": "ac81cbaf-d86f-43c3-860e-4797b395c701" }];

        $scope.Farms = [{ "Name": "BTEK", "IsActive": true, "Oid": "2eafac1f-cb67-418d-91fe-26f4fb0dc137" }, { "Name": "bryan farm", "IsActive": true, "Oid": "dde00857-47e3-4338-8ca7-0d2b41b2a9ea" }];

        $scope.Fields = [{ "FarmID": "2eafac1f-cb67-418d-91fe-26f4fb0dc137", "FarmName": "BTEK", "Name": "Tester", "IsActive": true, "Oid": "bccf93a3-0284-410d-a960-50363aacde41" },{ "FarmID": "ac81cbaf-d86f-43c3-860e-4797b395c701", "FarmName": "bryan farm", "Name": "Test2", "IsActive": true, "Oid": "2eafac1f-cb67-418d-91fe-26f4fb0dc137" }];

        $scope.Trucks = [{ "Name": "456", "RFID": null, "Tare": 13300.00000, "IsActive": true, "Oid": "34d718c7-64c8-4276-a7ec-1fba7aaca476" }, { "Name": "123", "RFID": "TEST", "Tare": 13540.00000, "IsActive": true, "Oid": "562a52fe-468a-4916-b59b-060068e15977" }, { "Name": "321", "RFID": null, "Tare": 14320.00000, "IsActive": true, "Oid": "95e0fc46-65b8-4ba7-91aa-359d24339de3" }, { "Name": "RED KW", "RFID": "00E0078067AE98132E", "Tare": 27500.00000, "IsActive": true, "Oid": "9401e081-7dee-41df-87d6-8165252d6196" }, { "Name": "BLUE KW", "RFID": "00E0078067AE983E78", "Tare": 27500.00000, "IsActive": true, "Oid": "ea1ad59e-f68f-44e5-a87e-63078a0cf614" }, { "Name": "YELLOW KW", "RFID": "00E0078067AE985E6F", "Tare": 27800.00000, "IsActive": true, "Oid": "0e0176a9-b637-4611-9797-9e58545ccd07" }, { "Name": "GRAY PETE", "RFID": "00E0078067AE983C4C", "Tare": 27640.00000, "IsActive": true, "Oid": "ab134d94-ca3e-4233-a519-1aa672732010" }, { "Name": "RWKW 01", "RFID": "00E0078067AE981070", "Tare": 27500.00000, "IsActive": true, "Oid": "14b552be-58db-4e71-a27e-e6b4127dae9f" }, { "Name": "RWKW 05", "RFID": "00E0078067AE98291F", "Tare": 27500.00000, "IsActive": true, "Oid": "4cbe96fa-3fc8-4c0c-b2bf-6419c2f49c2d" }, { "Name": "RED FORD", "RFID": "00E0078067AE985758", "Tare": 27500.00000, "IsActive": true, "Oid": "7596af8e-fe2a-4fdc-be7a-3404e7161f4a" }];
    };

});