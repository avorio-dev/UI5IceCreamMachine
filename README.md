# UI5IceCreamMachine
Ice Cream Machine Template with SAP UI5

>## What to adapt if you use:
>### Manifest.json
>>1. [sap.app].id : Change with your App namespace
>>2. [sap.app].applicationVersion : Change with your application version
>
>>1. [sap.ui5].rootView.viewName : change with your starting view 
>>2. [sap.ui5].dependencies.minUI5Version: change with your library version
>>3. [sap.ui5].models.i18n.settings.bundleName: Change the path of your i18n
>>4. [sap.ui5].models.routing: configure your navigation paths

>### index.html
>>1. Change the attribute of data-sap-ui-resourceroots
>>2. Change the default script which attach the ComponentContainer adapting name the attribute

>### Component.js
>>1. Adapt the "namespace" model created in init method with your paths
>>2. Change the "return UIComponent.extend" parameter with your namespace

### *controller.js
>> Adapt the "return UIComponent.extend" parameter with your namespace

### *view.xml
>> Adapt the "controllerName" attribute with your namespace

>### i18n.properties
>> Adapt your texts
