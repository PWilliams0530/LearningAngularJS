//----------------------------------------------------------------------------//
// This unit was automatically generated by the RemObjects SDK after reading  //
// the RODL file associated with this project .                               //
//                                                                            //
// Do not modify this unit manually, or your changes will be lost when this   //
// unit is regenerated the next time you compile the project.                 //
//----------------------------------------------------------------------------//


/* This codegen depends on RemObjects.js
* Usage:
* var Channel = new RemObjects.SDK.HTTPClientChannel("http://localhost:8099/JSON");
* var Message = new RemObjects.SDK.JSONMessage();
* var Service = new NewService(Channel, Message);
* Service.Sum(1, 2,
*             function(result) {
*                 alert(result);
*             },
*             function(msg) {alert(msg.getErrorMessage())}
* );
*
*/

// Enum: DataParity
function DataParity() {
  this.value = null;
};
DataParity.prototype = new RemObjects.SDK.ROEnumType();
DataParity.prototype.enumValues = [
    "None",
    "Odd",
    "Even"
	];
DataParity.prototype.constructor = DataParity;
RemObjects.SDK.RTTI["DataParity"] = DataParity;

// Enum: PortMode
function PortMode() {
  this.value = null;
};
PortMode.prototype = new RemObjects.SDK.ROEnumType();
PortMode.prototype.enumValues = [
    "COM",
    "TCP"
	];
PortMode.prototype.constructor = PortMode;
RemObjects.SDK.RTTI["PortMode"] = PortMode;


// Struct: Parameter
function Parameter() {
    this.DataType = {dataType : "AnsiString", value : null};
    this.Name = {dataType : "AnsiString", value : null};
    this.Value = {dataType : "AnsiString", value : null};
};
Parameter.prototype = new RemObjects.SDK.ROStructType();
Parameter.prototype.constructor = Parameter;
RemObjects.SDK.RTTI["Parameter"] = Parameter;

// Struct: ServerResponse
function ServerResponse() {
    this.Data = {dataType : "Binary", value : null};
    this.Error = {dataType : "AnsiString", value : null};
    this.Result = {dataType : "Integer", value : null};
};
ServerResponse.prototype = new RemObjects.SDK.ROStructType();
ServerResponse.prototype.constructor = ServerResponse;
RemObjects.SDK.RTTI["ServerResponse"] = ServerResponse;

// Struct: TFileInfo
function TFileInfo() {
    this.Filename = {dataType : "AnsiString", value : null};
    this.FileSize = {dataType : "Int64", value : null};
    this.FileTypeName = {dataType : "AnsiString", value : null};
};
TFileInfo.prototype = new RemObjects.SDK.ROStructType();
TFileInfo.prototype.constructor = TFileInfo;
RemObjects.SDK.RTTI["TFileInfo"] = TFileInfo;

// Struct: PrinterSettings
function PrinterSettings() {
    this.BaudRate = {dataType : "Integer", value : null};
    this.DataBits = {dataType : "Integer", value : null};
    this.Host = {dataType : "AnsiString", value : null};
    this.Mode = {dataType : "PortMode", value : null};
    this.Parity = {dataType : "DataParity", value : null};
    this.Port = {dataType : "Integer", value : null};
};
PrinterSettings.prototype = new RemObjects.SDK.ROStructType();
PrinterSettings.prototype.constructor = PrinterSettings;
RemObjects.SDK.RTTI["PrinterSettings"] = PrinterSettings;


// Array: Parameters
function Parameters() {
  RemObjects.SDK.ROArrayType.call(this);
  this.elementType = "Parameter";
};
Parameters.prototype = new RemObjects.SDK.ROArrayType();
Parameters.prototype.constructor = Parameters;
RemObjects.SDK.RTTI["Parameters"] = Parameters;

// Array: StringArray
function StringArray() {
  RemObjects.SDK.ROArrayType.call(this);
  this.elementType = "AnsiString";
};
StringArray.prototype = new RemObjects.SDK.ROArrayType();
StringArray.prototype.constructor = StringArray;
RemObjects.SDK.RTTI["StringArray"] = StringArray;

// Array: TFileArray
function TFileArray() {
  RemObjects.SDK.ROArrayType.call(this);
  this.elementType = "TFileInfo";
};
TFileArray.prototype = new RemObjects.SDK.ROArrayType();
TFileArray.prototype.constructor = TFileArray;
RemObjects.SDK.RTTI["TFileArray"] = TFileArray;



// Service: DatabaseService
function DatabaseService(__channel, __message, __service_name) {
  RemObjects.SDK.ROService.call(this, __channel, __message, __service_name);
  this.fServiceName = this.fServiceName || __service_name || "DatabaseService";
};


DatabaseService.prototype.AppendRecord = function(
	Catalog,
	TableName,
	Values,
	__success, __error) {
    try {
        var msg = this.fMessage.clone();
        msg.initialize(this.fServiceName, "AppendRecord");
        msg.write("Catalog", "AnsiString", Catalog);
        msg.write("TableName", "AnsiString", TableName);
        msg.write("Values", "Parameters", Values);
        msg.finalize();
        this.fChannel.dispatch(msg, function (__message) {
		var __result = __message.read("Result", "ServerResponse");
	        __success(
		__result
		);
        }, __error);

    } catch (e) {
        __error(msg, e);
    };
};

DatabaseService.prototype.ApplyUpdates = function(
	Catalog,
	Table,
	__success, __error) {
    try {
        var msg = this.fMessage.clone();
        msg.initialize(this.fServiceName, "ApplyUpdates");
        msg.write("Catalog", "AnsiString", Catalog);
        msg.write("Table", "Binary", Table);
        msg.finalize();
        this.fChannel.dispatch(msg, function (__message) {
		var __result = __message.read("Result", "ServerResponse");
	        __success(
		__result
		);
        }, __error);

    } catch (e) {
        __error(msg, e);
    };
};

DatabaseService.prototype.DeleteRecords = function(
	Catalog,
	TableName,
	Params,
	__success, __error) {
    try {
        var msg = this.fMessage.clone();
        msg.initialize(this.fServiceName, "DeleteRecords");
        msg.write("Catalog", "AnsiString", Catalog);
        msg.write("TableName", "AnsiString", TableName);
        msg.write("Params", "Parameters", Params);
        msg.finalize();
        this.fChannel.dispatch(msg, function (__message) {
		var __result = __message.read("Result", "ServerResponse");
	        __success(
		__result
		);
        }, __error);

    } catch (e) {
        __error(msg, e);
    };
};

DatabaseService.prototype.ExecQuery = function(
	Catalog,
	sql,
	__success, __error) {
    try {
        var msg = this.fMessage.clone();
        msg.initialize(this.fServiceName, "ExecQuery");
        msg.write("Catalog", "AnsiString", Catalog);
        msg.write("sql", "AnsiString", sql);
        msg.finalize();
        this.fChannel.dispatch(msg, function (__message) {
		var __result = __message.read("Result", "AnsiString");
	        __success(
		__result
		);
        }, __error);

    } catch (e) {
        __error(msg, e);
    };
};

DatabaseService.prototype.ExecSQL = function(
	Catalog,
	sql,
	Params,
	__success, __error) {
    try {
        var msg = this.fMessage.clone();
        msg.initialize(this.fServiceName, "ExecSQL");
        msg.write("Catalog", "AnsiString", Catalog);
        msg.write("sql", "AnsiString", sql);
        msg.write("Params", "Parameters", Params);
        msg.finalize();
        this.fChannel.dispatch(msg, function (__message) {
		var __result = __message.read("Result", "ServerResponse");
	        __success(
		__result
		);
        }, __error);

    } catch (e) {
        __error(msg, e);
    };
};

DatabaseService.prototype.GetData = function(
	Catalog,
	sql,
	__success, __error) {
    try {
        var msg = this.fMessage.clone();
        msg.initialize(this.fServiceName, "GetData");
        msg.write("Catalog", "AnsiString", Catalog);
        msg.write("sql", "AnsiString", sql);
        msg.finalize();
        this.fChannel.dispatch(msg, function (__message) {
		var __result = __message.read("Result", "AnsiString");
	        __success(
		__result
		);
        }, __error);

    } catch (e) {
        __error(msg, e);
    };
};

DatabaseService.prototype.GetRecords = function(
	Catalog,
	sql,
	Params,
	__success, __error) {
    try {
        var msg = this.fMessage.clone();
        msg.initialize(this.fServiceName, "GetRecords");
        msg.write("Catalog", "AnsiString", Catalog);
        msg.write("sql", "AnsiString", sql);
        msg.write("Params", "Parameters", Params);
        msg.finalize();
        this.fChannel.dispatch(msg, function (__message) {
		var __result = __message.read("Result", "ServerResponse");
	        __success(
		__result
		);
        }, __error);

    } catch (e) {
        __error(msg, e);
    };
};

DatabaseService.prototype.GetSchema = function(
	Catalog,
	__success, __error) {
    try {
        var msg = this.fMessage.clone();
        msg.initialize(this.fServiceName, "GetSchema");
        msg.write("Catalog", "AnsiString", Catalog);
        msg.finalize();
        this.fChannel.dispatch(msg, function (__message) {
		var __result = __message.read("Result", "ServerResponse");
	        __success(
		__result
		);
        }, __error);

    } catch (e) {
        __error(msg, e);
    };
};

DatabaseService.prototype.GetTableNames = function(
	Catalog,
	__success, __error) {
    try {
        var msg = this.fMessage.clone();
        msg.initialize(this.fServiceName, "GetTableNames");
        msg.write("Catalog", "AnsiString", Catalog);
        msg.finalize();
        this.fChannel.dispatch(msg, function (__message) {
		var __result = __message.read("Result", "AnsiString");
	        __success(
		__result
		);
        }, __error);

    } catch (e) {
        __error(msg, e);
    };
};

DatabaseService.prototype.GetTableSchema = function(
	Catalog,
	TableName,
	__success, __error) {
    try {
        var msg = this.fMessage.clone();
        msg.initialize(this.fServiceName, "GetTableSchema");
        msg.write("Catalog", "AnsiString", Catalog);
        msg.write("TableName", "AnsiString", TableName);
        msg.finalize();
        this.fChannel.dispatch(msg, function (__message) {
		var __result = __message.read("Result", "AnsiString");
	        __success(
		__result
		);
        }, __error);

    } catch (e) {
        __error(msg, e);
    };
};

DatabaseService.prototype.Ping = function(
	__success, __error) {
    try {
        var msg = this.fMessage.clone();
        msg.initialize(this.fServiceName, "Ping");
        msg.finalize();
        this.fChannel.dispatch(msg, function (__message) {
		var __result = __message.read("Result", "Boolean");
	        __success(
		__result
		);
        }, __error);

    } catch (e) {
        __error(msg, e);
    };
};

DatabaseService.prototype.UpdateRecords = function(
	Catalog,
	TableName,
	Values,
	Keys,
	__success, __error) {
    try {
        var msg = this.fMessage.clone();
        msg.initialize(this.fServiceName, "UpdateRecords");
        msg.write("Catalog", "AnsiString", Catalog);
        msg.write("TableName", "AnsiString", TableName);
        msg.write("Values", "Parameters", Values);
        msg.write("Keys", "Parameters", Keys);
        msg.finalize();
        this.fChannel.dispatch(msg, function (__message) {
		var __result = __message.read("Result", "ServerResponse");
	        __success(
		__result
		);
        }, __error);

    } catch (e) {
        __error(msg, e);
    };
};

DatabaseService.prototype.AppendUpdate = function(
	Catalog,
	DataType,
	Data,
	__success, __error) {
    try {
        var msg = this.fMessage.clone();
        msg.initialize(this.fServiceName, "AppendUpdate");
        msg.write("Catalog", "AnsiString", Catalog);
        msg.write("DataType", "AnsiString", DataType);
        msg.write("Data", "AnsiString", Data);
        msg.finalize();
        this.fChannel.dispatch(msg, function (__message) {
		var __result = __message.read("Result", "AnsiString");
	        __success(
		__result
		);
        }, __error);

    } catch (e) {
        __error(msg, e);
    };
};

DatabaseService.prototype.DeleteObject = function(
	Catalog,
	DataType,
	Data,
	__success, __error) {
    try {
        var msg = this.fMessage.clone();
        msg.initialize(this.fServiceName, "DeleteObject");
        msg.write("Catalog", "AnsiString", Catalog);
        msg.write("DataType", "AnsiString", DataType);
        msg.write("Data", "AnsiString", Data);
        msg.finalize();
        this.fChannel.dispatch(msg, function (__message) {
		var __result = __message.read("Result", "AnsiString");
	        __success(
		__result
		);
        }, __error);

    } catch (e) {
        __error(msg, e);
    };
};

DatabaseService.prototype.GetObjects = function(
	Catalog,
	DataType,
	Keys,
	__success, __error) {
    try {
        var msg = this.fMessage.clone();
        msg.initialize(this.fServiceName, "GetObjects");
        msg.write("Catalog", "AnsiString", Catalog);
        msg.write("DataType", "AnsiString", DataType);
        msg.write("Keys", "Parameters", Keys);
        msg.finalize();
        this.fChannel.dispatch(msg, function (__message) {
		var __result = __message.read("Result", "AnsiString");
	        __success(
		__result
		);
        }, __error);

    } catch (e) {
        __error(msg, e);
    };
};


// Service: FileService
function FileService(__channel, __message, __service_name) {
  RemObjects.SDK.ROService.call(this, __channel, __message, __service_name);
  this.fServiceName = this.fServiceName || __service_name || "FileService";
};


FileService.prototype.GetDirectory = function(
	SearchPath,
	__success, __error) {
    try {
        var msg = this.fMessage.clone();
        msg.initialize(this.fServiceName, "GetDirectory");
        msg.write("SearchPath", "AnsiString", SearchPath);
        msg.finalize();
        this.fChannel.dispatch(msg, function (__message) {
		var __result = __message.read("Result", "TFileArray");
	        __success(
		__result
		);
        }, __error);

    } catch (e) {
        __error(msg, e);
    };
};

FileService.prototype.GetFile = function(
	Filename,
	__success, __error) {
    try {
        var msg = this.fMessage.clone();
        msg.initialize(this.fServiceName, "GetFile");
        msg.write("Filename", "AnsiString", Filename);
        msg.finalize();
        this.fChannel.dispatch(msg, function (__message) {
		var __result = __message.read("Result", "Binary");
	        __success(
		__result
		);
        }, __error);

    } catch (e) {
        __error(msg, e);
    };
};

FileService.prototype.PutFile = function(
	Filename,
	Data,
	__success, __error) {
    try {
        var msg = this.fMessage.clone();
        msg.initialize(this.fServiceName, "PutFile");
        msg.write("Filename", "AnsiString", Filename);
        msg.write("Data", "Binary", Data);
        msg.finalize();
        this.fChannel.dispatch(msg, function (__message) {
	        __success(
		);
        }, __error);

    } catch (e) {
        __error(msg, e);
    };
};

FileService.prototype.DeleteFile = function(
	Filename,
	__success, __error) {
    try {
        var msg = this.fMessage.clone();
        msg.initialize(this.fServiceName, "DeleteFile");
        msg.write("Filename", "AnsiString", Filename);
        msg.finalize();
        this.fChannel.dispatch(msg, function (__message) {
	        __success(
		);
        }, __error);

    } catch (e) {
        __error(msg, e);
    };
};

FileService.prototype.RenameFile = function(
	OriginalFilename,
	NewFilename,
	__success, __error) {
    try {
        var msg = this.fMessage.clone();
        msg.initialize(this.fServiceName, "RenameFile");
        msg.write("OriginalFilename", "AnsiString", OriginalFilename);
        msg.write("NewFilename", "AnsiString", NewFilename);
        msg.finalize();
        this.fChannel.dispatch(msg, function (__message) {
	        __success(
		);
        }, __error);

    } catch (e) {
        __error(msg, e);
    };
};

FileService.prototype.DirectoryExists = function(
	Directory,
	__success, __error) {
    try {
        var msg = this.fMessage.clone();
        msg.initialize(this.fServiceName, "DirectoryExists");
        msg.write("Directory", "AnsiString", Directory);
        msg.finalize();
        this.fChannel.dispatch(msg, function (__message) {
		var __result = __message.read("Result", "Boolean");
	        __success(
		__result
		);
        }, __error);

    } catch (e) {
        __error(msg, e);
    };
};

FileService.prototype.CreateDirectory = function(
	Directory,
	__success, __error) {
    try {
        var msg = this.fMessage.clone();
        msg.initialize(this.fServiceName, "CreateDirectory");
        msg.write("Directory", "AnsiString", Directory);
        msg.finalize();
        this.fChannel.dispatch(msg, function (__message) {
	        __success(
		);
        }, __error);

    } catch (e) {
        __error(msg, e);
    };
};

FileService.prototype.DeleteDirectory = function(
	Directory,
	__success, __error) {
    try {
        var msg = this.fMessage.clone();
        msg.initialize(this.fServiceName, "DeleteDirectory");
        msg.write("Directory", "AnsiString", Directory);
        msg.finalize();
        this.fChannel.dispatch(msg, function (__message) {
	        __success(
		);
        }, __error);

    } catch (e) {
        __error(msg, e);
    };
};

FileService.prototype.FileExists = function(
	Filename,
	__success, __error) {
    try {
        var msg = this.fMessage.clone();
        msg.initialize(this.fServiceName, "FileExists");
        msg.write("Filename", "AnsiString", Filename);
        msg.finalize();
        this.fChannel.dispatch(msg, function (__message) {
		var __result = __message.read("Result", "Boolean");
	        __success(
		__result
		);
        }, __error);

    } catch (e) {
        __error(msg, e);
    };
};


// Service: PrintService
function PrintService(__channel, __message, __service_name) {
  RemObjects.SDK.ROService.call(this, __channel, __message, __service_name);
  this.fServiceName = this.fServiceName || __service_name || "PrintService";
};


PrintService.prototype.Print = function(
	PrinterDriver,
	Settings,
	PrintFormat,
	Copies,
	Values,
	__success, __error) {
    try {
        var msg = this.fMessage.clone();
        msg.initialize(this.fServiceName, "Print");
        msg.write("PrinterDriver", "AnsiString", PrinterDriver);
        msg.write("Settings", "PrinterSettings", Settings);
        msg.write("PrintFormat", "AnsiString", PrintFormat);
        msg.write("Copies", "Integer", Copies);
        msg.write("Values", "Parameters", Values);
        msg.finalize();
        this.fChannel.dispatch(msg, function (__message) {
		var __result = __message.read("Result", "AnsiString");
	        __success(
		__result
		);
        }, __error);

    } catch (e) {
        __error(msg, e);
    };
};

PrintService.prototype.PrintTemplate = function(
	PrinterDriver,
	Settings,
	FileName,
	Copies,
	Values,
	__success, __error) {
    try {
        var msg = this.fMessage.clone();
        msg.initialize(this.fServiceName, "PrintTemplate");
        msg.write("PrinterDriver", "AnsiString", PrinterDriver);
        msg.write("Settings", "PrinterSettings", Settings);
        msg.write("FileName", "AnsiString", FileName);
        msg.write("Copies", "Integer", Copies);
        msg.write("Values", "Parameters", Values);
        msg.finalize();
        this.fChannel.dispatch(msg, function (__message) {
		var __result = __message.read("Result", "AnsiString");
	        __success(
		__result
		);
        }, __error);

    } catch (e) {
        __error(msg, e);
    };
};

PrintService.prototype.GetDriverNames = function(
	__success, __error) {
    try {
        var msg = this.fMessage.clone();
        msg.initialize(this.fServiceName, "GetDriverNames");
        msg.finalize();
        this.fChannel.dispatch(msg, function (__message) {
		var __result = __message.read("Result", "StringArray");
	        __success(
		__result
		);
        }, __error);

    } catch (e) {
        __error(msg, e);
    };
};

PrintService.prototype.SetupPrinter = function(
	PrinterDriver,
	Mode,
	Parity,
	DataBits,
	Port,
	Host,
	BaudRate,
	__success, __error) {
    try {
        var msg = this.fMessage.clone();
        msg.initialize(this.fServiceName, "SetupPrinter");
        msg.write("PrinterDriver", "AnsiString", PrinterDriver);
        msg.write("Mode", "PortMode", Mode);
        msg.write("Parity", "DataParity", Parity);
        msg.write("DataBits", "Integer", DataBits);
        msg.write("Port", "Integer", Port);
        msg.write("Host", "AnsiString", Host);
        msg.write("BaudRate", "Integer", BaudRate);
        msg.finalize();
        this.fChannel.dispatch(msg, function (__message) {
	        __success(
		);
        }, __error);

    } catch (e) {
        __error(msg, e);
    };
};

PrintService.prototype.PrintBusinessObject = function(
	Catalog,
	DataType,
	Keys,
	FileName,
	__success, __error) {
    try {
        var msg = this.fMessage.clone();
        msg.initialize(this.fServiceName, "PrintBusinessObject");
        msg.write("Catalog", "AnsiString", Catalog);
        msg.write("DataType", "AnsiString", DataType);
        msg.write("Keys", "Parameters", Keys);
        msg.write("FileName", "AnsiString", FileName);
        msg.finalize();
        this.fChannel.dispatch(msg, function (__message) {
		var __result = __message.read("Result", "AnsiString");
	        __success(
		__result
		);
        }, __error);

    } catch (e) {
        __error(msg, e);
    };
};


// Service: SettingsService
function SettingsService(__channel, __message, __service_name) {
  RemObjects.SDK.ROService.call(this, __channel, __message, __service_name);
  this.fServiceName = this.fServiceName || __service_name || "SettingsService";
};


SettingsService.prototype.ReadBool = function(
	Node,
	Key,
	DefaultValue,
	__success, __error) {
    try {
        var msg = this.fMessage.clone();
        msg.initialize(this.fServiceName, "ReadBool");
        msg.write("Node", "AnsiString", Node);
        msg.write("Key", "AnsiString", Key);
        msg.write("DefaultValue", "Boolean", DefaultValue);
        msg.finalize();
        this.fChannel.dispatch(msg, function (__message) {
		var __result = __message.read("Result", "Boolean");
	        __success(
		__result
		);
        }, __error);

    } catch (e) {
        __error(msg, e);
    };
};

SettingsService.prototype.ReadDateTime = function(
	Node,
	Key,
	DefaultValue,
	__success, __error) {
    try {
        var msg = this.fMessage.clone();
        msg.initialize(this.fServiceName, "ReadDateTime");
        msg.write("Node", "AnsiString", Node);
        msg.write("Key", "AnsiString", Key);
        msg.write("DefaultValue", "DateTime", DefaultValue);
        msg.finalize();
        this.fChannel.dispatch(msg, function (__message) {
		var __result = __message.read("Result", "DateTime");
	        __success(
		__result
		);
        }, __error);

    } catch (e) {
        __error(msg, e);
    };
};

SettingsService.prototype.ReadDouble = function(
	Node,
	Key,
	DefaultValue,
	__success, __error) {
    try {
        var msg = this.fMessage.clone();
        msg.initialize(this.fServiceName, "ReadDouble");
        msg.write("Node", "AnsiString", Node);
        msg.write("Key", "AnsiString", Key);
        msg.write("DefaultValue", "Double", DefaultValue);
        msg.finalize();
        this.fChannel.dispatch(msg, function (__message) {
		var __result = __message.read("Result", "Double");
	        __success(
		__result
		);
        }, __error);

    } catch (e) {
        __error(msg, e);
    };
};

SettingsService.prototype.ReadInt = function(
	Node,
	Key,
	DefaultValue,
	__success, __error) {
    try {
        var msg = this.fMessage.clone();
        msg.initialize(this.fServiceName, "ReadInt");
        msg.write("Node", "AnsiString", Node);
        msg.write("Key", "AnsiString", Key);
        msg.write("DefaultValue", "Integer", DefaultValue);
        msg.finalize();
        this.fChannel.dispatch(msg, function (__message) {
		var __result = __message.read("Result", "Integer");
	        __success(
		__result
		);
        }, __error);

    } catch (e) {
        __error(msg, e);
    };
};

SettingsService.prototype.ReadString = function(
	Node,
	Key,
	DefaultValue,
	__success, __error) {
    try {
        var msg = this.fMessage.clone();
        msg.initialize(this.fServiceName, "ReadString");
        msg.write("Node", "AnsiString", Node);
        msg.write("Key", "AnsiString", Key);
        msg.write("DefaultValue", "AnsiString", DefaultValue);
        msg.finalize();
        this.fChannel.dispatch(msg, function (__message) {
		var __result = __message.read("Result", "AnsiString");
	        __success(
		__result
		);
        }, __error);

    } catch (e) {
        __error(msg, e);
    };
};

SettingsService.prototype.ReadStrings = function(
	Node,
	Key,
	DefaultValues,
	__success, __error) {
    try {
        var msg = this.fMessage.clone();
        msg.initialize(this.fServiceName, "ReadStrings");
        msg.write("Node", "AnsiString", Node);
        msg.write("Key", "AnsiString", Key);
        msg.write("DefaultValues", "StringArray", DefaultValues);
        msg.finalize();
        this.fChannel.dispatch(msg, function (__message) {
		var __result = __message.read("Result", "StringArray");
	        __success(
		__result
		);
        }, __error);

    } catch (e) {
        __error(msg, e);
    };
};

SettingsService.prototype.WriteBool = function(
	Node,
	Key,
	Value,
	__success, __error) {
    try {
        var msg = this.fMessage.clone();
        msg.initialize(this.fServiceName, "WriteBool");
        msg.write("Node", "AnsiString", Node);
        msg.write("Key", "AnsiString", Key);
        msg.write("Value", "Boolean", Value);
        msg.finalize();
        this.fChannel.dispatch(msg, function (__message) {
	        __success(
		);
        }, __error);

    } catch (e) {
        __error(msg, e);
    };
};

SettingsService.prototype.WriteDateTime = function(
	Node,
	Key,
	Value,
	__success, __error) {
    try {
        var msg = this.fMessage.clone();
        msg.initialize(this.fServiceName, "WriteDateTime");
        msg.write("Node", "AnsiString", Node);
        msg.write("Key", "AnsiString", Key);
        msg.write("Value", "DateTime", Value);
        msg.finalize();
        this.fChannel.dispatch(msg, function (__message) {
	        __success(
		);
        }, __error);

    } catch (e) {
        __error(msg, e);
    };
};

SettingsService.prototype.WriteDouble = function(
	Node,
	Key,
	Value,
	__success, __error) {
    try {
        var msg = this.fMessage.clone();
        msg.initialize(this.fServiceName, "WriteDouble");
        msg.write("Node", "AnsiString", Node);
        msg.write("Key", "AnsiString", Key);
        msg.write("Value", "Double", Value);
        msg.finalize();
        this.fChannel.dispatch(msg, function (__message) {
	        __success(
		);
        }, __error);

    } catch (e) {
        __error(msg, e);
    };
};

SettingsService.prototype.WriteInt = function(
	Node,
	Key,
	Value,
	__success, __error) {
    try {
        var msg = this.fMessage.clone();
        msg.initialize(this.fServiceName, "WriteInt");
        msg.write("Node", "AnsiString", Node);
        msg.write("Key", "AnsiString", Key);
        msg.write("Value", "Integer", Value);
        msg.finalize();
        this.fChannel.dispatch(msg, function (__message) {
	        __success(
		);
        }, __error);

    } catch (e) {
        __error(msg, e);
    };
};

SettingsService.prototype.ReadSettings = function(
	__success, __error) {
    try {
        var msg = this.fMessage.clone();
        msg.initialize(this.fServiceName, "ReadSettings");
        msg.finalize();
        this.fChannel.dispatch(msg, function (__message) {
		var __result = __message.read("Result", "AnsiString");
	        __success(
		__result
		);
        }, __error);

    } catch (e) {
        __error(msg, e);
    };
};

SettingsService.prototype.WriteSettings = function(
	Settings,
	__success, __error) {
    try {
        var msg = this.fMessage.clone();
        msg.initialize(this.fServiceName, "WriteSettings");
        msg.write("Settings", "AnsiString", Settings);
        msg.finalize();
        this.fChannel.dispatch(msg, function (__message) {
	        __success(
		);
        }, __error);

    } catch (e) {
        __error(msg, e);
    };
};

SettingsService.prototype.WriteString = function(
	Node,
	Key,
	Value,
	__success, __error) {
    try {
        var msg = this.fMessage.clone();
        msg.initialize(this.fServiceName, "WriteString");
        msg.write("Node", "AnsiString", Node);
        msg.write("Key", "AnsiString", Key);
        msg.write("Value", "AnsiString", Value);
        msg.finalize();
        this.fChannel.dispatch(msg, function (__message) {
	        __success(
		);
        }, __error);

    } catch (e) {
        __error(msg, e);
    };
};

SettingsService.prototype.WriteStrings = function(
	Node,
	Key,
	Values,
	__success, __error) {
    try {
        var msg = this.fMessage.clone();
        msg.initialize(this.fServiceName, "WriteStrings");
        msg.write("Node", "AnsiString", Node);
        msg.write("Key", "AnsiString", Key);
        msg.write("Values", "StringArray", Values);
        msg.finalize();
        this.fChannel.dispatch(msg, function (__message) {
	        __success(
		);
        }, __error);

    } catch (e) {
        __error(msg, e);
    };
};

