//Sintaxis Lenguaje de Programacion en Español Latino
//entorno de proyecto o espacio de trabajo
namespace = *esquema ...
//importaciones
import = *importa
//clases
class = *clase ...{...}
this = *local. ...
super = *padre(...,...)
//herencia de clase
extends = *hereda
//implementacion de interfaces
implements = *implementa
//interfaz
interface = *clase *modelo
//modificador de acceso
public = *publica, *publico
private = *privada, *privado
protected = *protegida, *protegido
static = *global
//synchronized = sincronizada/sincronizado este no creo q lo utilice
//metodos
method = *metodo
abstract = *indefinido
//void = sindevolucion/sinretorno los metodos no necesitaran establecer q retornaran, solo retornan y punto
return = *retorna
//tipo de variables
final = *constante;
(int = *entero 
double, float = *decimal 
String = *texto 
char = *caracter 
boolean = *cuestion) = *variable, *var
//condicional
if(){}else{} = *si(...){...}*sino{...}
switch(){ = *evalua(...){...}
	case 1: break; = *sies ...:... *termina;
	default: break; = *ninguno: ... *termina;
}
//bucles
for(int i = 0; i < 10; i ++){ = *usa *var i *de 0 *a 10 *incrementa 1
for(int i = 10; i >= 0; i --){ = *usa *var ... *de ... *a ... *disminuye ...
	continue; = continua;
}
do{ = *realiza {...}
}while(){} = *mientrasque(...){...}
while(){} = *mientrasque(...){...}
//errores
try{ = *capturarerroren{...}
}catch(){ = *sihayerror{...
	throw  = *reporta ...}
}
finally{} = *porultimo{}
//objetos
Object objeto = new Object(); = *variable ... = ...;
Object objeto = null = *variable ... = vacia;
boolean b = true; = *variable b = cierto;
boolean b = false;  *variable b = falso;
//instanceof = esinstanciade
//synchronized(){} = sincroniza(...){...}
/*
objetos de lenguaje con color gradiente de fondo diferente: 
(esquema = naranja, clase = rosa, metodo = verde, variable = celeste) 

palabras / colores
------------------
[esquema,importa,publica,publico,privado,privada,
 protegido,protegida,global,indefinido] = #FD7C22 (naranja)

[clase,si,sino,evalua,sies,termina,ninguno,
usa,desde,hasta,incrementa,disminuye,continua, realiza,
mientrasque,capturarerroren,sihayerror,reporta,porultimo] = #F92472 (rosa)

[metodo,constructor,retorna] = #77CE2B  (verde)

[var,variable,constante,entero,decimal,texto,
 caracter,cuestion] = #43B0E8 (celeste)

[local, padre] = #2B3FD0 (azul)

[hereda, implementa, modelo] = #982BCE (morado oscuro)

[#] =  #49DAB3  (verde celeste)

[] = #232923 (plomo oscuro)

+ - * / % < > = ! ? : . ; & | = #D02B2B (rojo)

{ } ( ) { } [ ] , = #B0B0B0 (plomo claro)

"abc" 'a' = #439000 (verde oscuro)

[vacia,cierto,falso,0,1,2,3,4,5,6,7,8,9,\n,\t,\r] = #8C80FF (morado claro)
*/


//POSIBLES FUNCIONALIDADES A AGREGAR
/*
	1. UNA BARRA QUE CONTENGA ABIERTO LOS ARCHIVOS QUE ESTA VIENDO EL USUARIO
	2. LA PAGINA OFICIAL TENDRA: DESCRIPCION DE LA APLICACION(LANDING PAGE), DOCUMENTACION, USUARIOS. UNA PERSONA NO REGISTRADA TAMBIEN PUEDE USAR
		EL IDE PERO NO PODRA GUARDAR ARCHIVOS EN LA BASEDEDATOS, SOLO PODRA GUARDAR EN LA PC.
	3. LOS USUARIOS REGISTRADOS TENDRAN UN DASHBOARD EN EL QUE PODRAN VER TODOS LOS PROYECTOS, ARCHIVOS GUARDADOS ADEMAS DE CREAR NUEVOS PROYECTOS DESDE AHI.
	4. LOS TIPOS DE ARCHIVOS SERAN ARCHIVONORMAL.BG ARCHIVOBD.SQL, 
*/
//ERRORES:
/*
	1. AL NOMBRAR UNA CLASE, UNA VARIABLE O UN METODO, PUEDE NOMBRARSE CON NUMEROS Y AL PONER NUMEROS LOS COLOREARA EN MORADOCLARO PERO DEBERIA SER NEGRO
*/
//SOLUCIONES:
/*
	1. TENER UNA RESTRICCION: LOS NOMBRES DE VARIABLES, METODOS Y CLASES NO PUEDEN TENER NUMEROS
*/