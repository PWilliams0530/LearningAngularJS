      var Channel;
      var Message;
      var Scales;
      var Settings;
      var Database;

      var gross = 0;
      var units = "lb";

      function StartVNC()
      {
        try
        {
          var vncpassword = document.getElementById('vncpassword').value;

          Settings.WriteString('VNC', 'Password', vncpassword,
            function(result) { },
            function(msg) { alert(msg.getErrorMessage()); }
          );

          Scales.StartVNC(vncpassword, function(result) { alert("VNC Started"); }, function(msg) { alert(msg.getErrorMessage()); });
        } catch (e) {
          alert(e);
        }  
      }

      function StopVNC()
      {
        try
        {
          Scales.StopVNC(function(result) { alert("VNC Stopped"); }, function(msg) { alert(msg.getErrorMessage()); });
        } catch (e) {
          alert(e);
        }  
      }

      function InitPage()
      {
        try
        {
          Channel = new RemObjects.SDK.HTTPClientChannel("http://192.168.34.164:8095/JSON");
          Message = new RemObjects.SDK.JSONMessage();
          Settings = new SettingsService(Channel, Message);
          Scales = new ScaleService(Channel, Message);
          Database = new DatabaseService(Channel, Message);

          Settings.ReadString("VNC", "Password", "123",
            function(result) 
            {
              document.getElementById('vncpassword').value = result; 
            },

            function(msg) { alert(msg.getErrorMessage()); }
          );

          setInterval(UpdateWeight, 1000);

    //Get Customer Data
    Database.GetData("TruckIO.sdf", "SELECT * FROM [CUSTOMER]",
		function(result) 
		{
			document.getElementById('customers').innerHTML = result;

			var select = document.createElement("select");
  
			var obj = JSON.parse(result);

			for (var i=0; i < obj.CUSTOMER.length; i++)
			{
				var option = document.createElement("option");
				option.id = obj.CUSTOMER[i].Oid;
				option.value = obj.CUSTOMER[i].Oid;
				option.innerHTML = obj.CUSTOMER[i].Name;
				select.appendChild(option);
			}

			$( "#customerselect" ).append(select);

			$( "#customerselect" ).change(function() {
  				document.getElementById('customers').innerHTML = this.children[0].value;
				
			});		

		},
		function(msg) { alert(msg.getErrorMessage()); }
		);
        } catch (e) {
          alert(e);
        }  
 
      }
      
                // This is the function.
		String.prototype.format = function (args) {
			var str = this;
			return str.replace(String.prototype.format.regex, function(item) {
				var intVal = parseInt(item.substring(1, item.length - 1));
				var replace;
				if (intVal >= 0) {
					replace = args[intVal];
				} else if (intVal === -1) {
					replace = "{";
				} else if (intVal === -2) {
					replace = "}";
				} else {
					replace = "";
				}
				return replace;
			});
		};
		String.prototype.format.regex = new RegExp("{-?[0-9]+}", "g");

      function UpdateWeight()
      {
        try
        {
          var str = "{0} {1}";

          Scales.GetGross("A", function(result) { gross = result; }, function(msg) { gross = gross + 1; });
          Scales.GetUnits("A", function(result) { units = result; }, function(msg) { units = "??"; });

          document.getElementById("scalewt").innerHTML = str.format([gross, units]);
        } catch (e) {
          alert(e);
        }  
      }

      function RestartDiade()
      {
        Scales.Reboot(function(result) { alert("Restarting"); }, function(msg) { alert(msg.getErrorMessage()); });
      }