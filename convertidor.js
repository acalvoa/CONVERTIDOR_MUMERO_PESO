(function(){
	//DEFINIMOS EL OBJECTO COMO VARIABLE GLOBAL DE CLASE
	//REQUIRIERA EL USO DE JQUERY PARA UTILIZAR CIERTAS FUNCIONES DE IMPORTACION
	var CNP = function(excepciones, cifras, sufijos){
		//CREAMOS LA MATRIZ DE INICIALIZACION
		var M_EXCEPTIONS, M_NUMBER, M_SUFIJOS;
		//CREAMOS EL CONSTRUCTOR
		var _CONSTRUCT = function(exception,numbers,sufijos){
			//CARGAMOS LAS TRES MATRICES DE NUMEROS
			if(typeof exception != "undefined") M_EXCEPTIONS = exception;
			if(typeof numbers != "undefined") M_NUMBER = numbers;
			if(typeof numbers != "undefined") M_SUFIJOS = sufijos;
		}	
		var METHOD = {
			//ESTA AGUJA ES UTILIZADA PARA DEFINIR LOS MAXIMOS POSIBLES (NEEDLE ARRAY)
			AGUJA: [1000000000000,1000000000,1000000,1000,100,10,1],
			//FUNCION RECURSIVA PARA DETERMINAR LOS TEXTOS DE CADA NUMERO
			SECUENCE: function(NUMBER_VALUE){
				if(typeof M_EXCEPTIONS[NUMBER_VALUE] != "undefined") return M_EXCEPTIONS[NUMBER_VALUE]; 
				if(NUMBER_VALUE >= 1 && NUMBER_VALUE <=9) return M_NUMBER[NUMBER_VALUE];
				//STR QUE SERA RETORNADO AL FINAL DEL PROCESO
				var STR_NUM = "";
				for(var i=0;i<METHOD.AGUJA.length;i++){
					var AGUJA = METHOD.AGUJA[i];
					//CALCULAMOS LA HEAD Y TAIL A PARTIR DEL MODULO Y DIVISION
					var _HEAD = Math.floor(NUMBER_VALUE/AGUJA);
					var _TAIL = Math.floor(NUMBER_VALUE%AGUJA);
					//COMENZAMOS LOS FLUJOS DE COMPROBACION
					if(_HEAD == 0) continue;
					if(_HEAD >= 1 && _TAIL >= 0){
						//PRIMERO BUSCAMOS EN LA MATRIZ DE EXCEPCIONES DEL LENGUAJE 
						if(typeof M_EXCEPTIONS[(_HEAD*AGUJA).toString().replace(/0/gi,"#")] != "undefined")
						{
							STR_NUM += M_EXCEPTIONS[(_HEAD*AGUJA).toString().replace(/0/gi,"#")]+" "; 
						}
						else if(typeof M_EXCEPTIONS[_HEAD*AGUJA] != "undefined")
						{
							STR_NUM += M_EXCEPTIONS[_HEAD*AGUJA]+" "; 
						}
						//SINO USA LA CONVENCION NORMAL DE NUMEROS
						else
						{
							if(_HEAD >= 0 && _HEAD <=9 && _TAIL == 0){
								//EN ESTE PUNTO QUIERE DECIR QUE SOLO QUEDA UN DIGITO CON UNIDAD ENTRE 1 Y 9
								STR_NUM += "y "+METHOD.SECUENCE(_HEAD)+" ";
							} 
							else{
								// ACA QUIERE DECIR QUE DEBE SER ITERADO RECURISVAMENTE EL RESTO DEL NUMERO DETERMINADO PARA HEAD EN LA AGUJA ACTUAL
								STR_NUM += METHOD.SECUENCE(_HEAD)+" "+M_SUFIJOS[AGUJA]+" ";
							}
						}
					}
					//VOLVEMOS EL NUMERO A ANALIZAR LA COLA QUE NO HA SIDO CALCULADA
					NUMBER_VALUE = _TAIL;
					//SI LA COLA ES CERO ESO QUIERE DECIR QUE LA ITERACION DEBE SER TERMINADA PORQUE NO HAY MAS NUMERO QUE ANALIZAR
					if(NUMBER_VALUE == 0){
						break;
					}
				}
				return STR_NUM;
			}
		}
		//CREAMOS LAS FUNCIONES DE CONVERTIDOR
		this.PUB = {
			CONVERT: function(NUMBER_VALUE){
				//SOPORTA DE LOS BILLONES DE PESOS
				var STR = METHOD.SECUENCE(NUMBER_VALUE);
				// SI ES SOLO UNA UNIDAD PARA EL LENGUAJE ESPAÑOL DEBE DECIR PESO Y NO PESOS
				//SE INDICA TAL SITUACION
				if(NUMBER_VALUE > 1){
					return STR+" Pesos";
				}
				else
				{
					return STR+" Peso";
				}
			},
		};
		//INSTANCIAMOS EL CONSTRUCTOR
		_CONSTRUCT(excepciones,cifras,sufijos);
	};
	//*****************************************/
	// SET DE PRUEBAS
	// ITERAMOS UNA MATRIZ CON NUMEROS DEL 1 AL 100
	//*****************************************/                         
	var CONVERTIDOR = new CNP(exceptions,numbers,sufijos);
	for(var k=1; k<=100; k++){
		document.write(CONVERTIDOR.PUB.CONVERT(k)+"<br>");
	}
	//*****************************************/
	// SET DE PRUEBAS
	// ITERAMOS UNA MATRIZ CON NUMEROS RANDOM DEL 1 AL 1000000000000
	//*****************************************/
	for(var k=1; k<=100; k++){
		var rand = Math.random();
		var numero = Math.floor(rand*1000000000000);
		document.write("Numero "+numero+": "+CONVERTIDOR.PUB.CONVERT(numero)+"<br>");
	}
})();