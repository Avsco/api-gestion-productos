/*==============================================================*/
/* DBMS name:      PostgreSQL 8                                 */
/* Created on:     6/6/2022 10:38:08 AM                         */
/*==============================================================*/
drop domain if exists public.sexo cascade;
drop domain if exists public.nivel_academico cascade;
drop domain if exists public.nivel_manejo cascade;
drop domain if exists public.tipo_gestion cascade;
drop domain if exists public.descripcion_investigacion cascade;
drop domain if exists public.tipo_investigacion_interna cascade;
drop domain if exists public.clasificacion_evento cascade;
drop domain if exists public.tipo_participacion cascade;
drop domain if exists public.medio_divulgacion cascade;
drop domain if exists public.tipo_tutoria cascade;
drop domain if exists public.orientacion_tutoria cascade;
drop domain if exists public.tipo_software cascade;
drop domain if exists public.tipo_producto cascade;
drop domain if exists public.clase_producto cascade;
drop domain if exists public.tipo_proceso cascade;



create domain public.sexo as varchar(9)
check(
value='Masculino' or value='Femenino'
);

create domain public.tipo_gestion as varchar(9)
check(
value='Semestral' or value='Anual'
);

create domain public.nivel_manejo as varchar(9)
check(
value='Poco' or value='Razonable' or value='Bien'
);

create domain public.nivel_academico as varchar(25)
check(
value='Tecnico Medio' or value='Tecnico nivel Superior' or value='Licenciatura' or value='Diplomado' or value='Especialidad' 
or value='Maestria' or value='Doctorado' or value='Posdoctorado'
);

create domain public.descripcion_investigacion as varchar(25)
check(
value='Creación y/o organización de unidades' or value='Planificación estratégica' or value='Responsable de Unidad de Investigación' 
or value='Coordinador Programa Investigación' 
);

create domain public.tipo_investigacion_interna as varchar(21)
check(
value='Desarrollo tecnológico' or value='Transferencia' or value='Investigaciónn'
);

create domain public.clasificacion_evento as varchar(13)
check(
value='Internacional' or value='Nacional' or value='Regional'
);

create domain public.tipo_participacion as varchar(34)
check(
value='Comité de organización' or value='Conferencista/exposición magistral' or value='Ponente/Disertante'
);

create domain public.medio_divulgacion as varchar(11)
check(
value='Impreso' or value='Electronico'
);

create domain public.tipo_tutoria as varchar(50)
check(
value='Tutoria de PhD' or value='Tutoria de Msc' or value='Tutoria de especializacion medica' 
or value='Tutoria de grado' or value='Tutoria de pasante en proyectos de Investigación'
);

create domain public.orientacion_tutoria as varchar(15)
check(
value='Tutor principal' or value='Cotutor/Asesor'
);

create domain public.tipo_software as varchar(25)
check(
value='Aplicacion de escritorio' or value='Aplicacion en Red' or value='Aplicacion Web' 
);

create domain public.tipo_producto as varchar(25)
check(
value='Productos de Consumo' or value='Productos de Inversion' 
);

create domain public.clase_producto as varchar(15)
check(
value='Nuevo' or value='Mejorado' 
);

create domain public.tipo_proceso as varchar(25)
check(
value='Analitica' or value='Instrumental' or value='Pedagogica' or value='Industrial/Procesal'
or value='Terapeutica' or value='Otra'
);



drop index if exists ARTICULOS_CIENTIFICOS_PK;
drop index if exists AUTORES_PK;
drop index if exists OCUPA_FK;
drop index if exists TIENE_FK;
drop index if exists CARGO_POSTULANTE_PK;
drop index if exists COMITEEVALUADOR_PK;
drop index if exists CONSULTORIA_PK;
drop index if exists DATOS_POSTULANTE_PK;
drop index if exists DIRECCION_INSTITUCIONAL_PK;
drop index if exists EVENTOSCIENTIFICOS_PK;
drop index if exists PUDO_SER_FK;
drop index if exists EVENTOS_CIENTIFICOS_PK;
drop index if exists CUENTA_FK;
drop index if exists EXPERIENCIA_PK;
drop index if exists FINANCIADOPOR_FK;
drop index if exists FINANZAS_PK;
drop index if exists RECIBIO_FK;
drop index if exists FORMACION_ACADEMICA_PK;
drop index if exists DOMINA_FK;
drop index if exists IDIOMAS_PK;
drop index if exists INFORMESTECNICOS_PK;
drop index if exists FORMAN_FK;
drop index if exists CONFORMAN3_FK;
drop index if exists INTEGRANTESPRODUCCION_PK;
drop index if exists INVESTIGACION_PK;
drop index if exists INVESTIGADOR_PK;
drop index if exists LIBROSCAPITULOS_PK;
drop index if exists EVALUAN_FK;
drop index if exists CONFORMAN2_FK;
drop index if exists MIEMBROCOMITEEVALUADOR_PK;
drop index if exists MANEJAN_FK;
drop index if exists CONFORMAN_FK;
drop index if exists MIEMBROSEQUIPO_PK;
drop index if exists POSGRADO_PK;
drop index if exists PREMIOS_Y_TITULOS_PK;
drop index if exists PROCESOSYMECANISMOS_PK;
drop index if exists PRESENTA_FK;
drop index if exists PRODUCCION_PK;
drop index if exists PRODUCTOSTECNOLOGICOS_PK;
drop index if exists PROYECTOINTERNO_PK;
drop index if exists SOFTWAREDESARROLLADO_PK;
drop index if exists TUTORIAS_PK;
drop table if exists TUTORIAS;
drop table if exists ARTICULOS_CIENTIFICOS;
drop table if exists SOFTWAREDESARROLLADO;
drop table if exists PRODUCTOSTECNOLOGICOS;
drop table if exists PROCESOSYMECANISMOS;
drop table if exists PREMIOS_Y_TITULOS;
drop table if exists POSGRADO;
drop table if exists MIEMBROSEQUIPO;
drop table if exists MIEMBROCOMITEEVALUADOR;
drop table if exists LIBROSCAPITULOS;
drop table if exists CARGO_POSTULANTE;
drop table if exists INVESTIGADOR;
drop table if exists INVESTIGACION;
drop table if exists INTEGRANTESPRODUCCION;
drop table if exists IDIOMAS;
drop table if exists INFORMESTECNICOS;
drop table if exists FINANZAS;
drop table if exists FORMACION_ACADEMICA;
drop table if exists EVENTOS_CIENTIFICOS;
drop table if exists PR_EVENTOSCIENTIFICOS;
drop table if exists COMITEEVALUADOR;
drop table if exists DIRECCION_INSTITUCIONAL;
drop table if exists CONSULTORIA;
drop table if exists PROYECTOINTERNO;
drop table if exists PRODUCCION;
drop table if exists AUTORES;
drop table if exists EXPERIENCIA;
drop table if exists DATOS_POSTULANTE;

/*==============================================================*/
/* Table: ARTICULOS_CIENTIFICOS                                 */
/*==============================================================*/
create table ARTICULOS_CIENTIFICOS (
   IDPOSTULANTE         INT4                 not null,
   IDPRODUCCION         INT4                 not null,
   MEDIOARTICULO        medio_divulgacion          not null,
   DOIARTICULO          VARCHAR(50)          not null,
   REVISTAARTICULO      VARCHAR(50)          not null,
   ISSNARTICULO         VARCHAR(50)          not null,
   FASCICULOARTICULO    VARCHAR(50)          not null,
   VOLUMENARTICULO      VARCHAR(50)          not null,
   SERIEARTICULO        VARCHAR(50)          not null,
   PAGINICIALARTICULO   INT4                 not null,
   PAGFINALARTICULO     INT4                 not null,
   AREAARTICULO         VARCHAR(50)          not null,
   CAMPOARTICULO        VARCHAR(50)          not null,
   DISCIPLINAARTICULO   VARCHAR(50)          not null,
   constraint PK_ARTICULOS_CIENTIFICOS primary key (IDPOSTULANTE, IDPRODUCCION)
);

/*==============================================================*/
/* Index: ARTICULOS_CIENTIFICOS_PK                              */
/*==============================================================*/
create unique index ARTICULOS_CIENTIFICOS_PK on ARTICULOS_CIENTIFICOS (
IDPOSTULANTE,
IDPRODUCCION
);

/*==============================================================*/
/* Table: AUTORES                                               */
/*==============================================================*/
create table AUTORES (
   IDAUTOR              VARCHAR(50)          not null,
   NOMBRECOMPLETOAUTOR  VARCHAR(100)         not null,
   constraint PK_AUTORES primary key (IDAUTOR)
);

/*==============================================================*/
/* Index: AUTORES_PK                                            */
/*==============================================================*/
create unique index AUTORES_PK on AUTORES (
IDAUTOR
);

/*==============================================================*/
/* Table: CARGO_POSTULANTE                                      */
/*==============================================================*/
create table CARGO_POSTULANTE (
   IDPOSTULANTE         INT4                 not null,
   IDDIRECCION          INT4                 not null,
   NOMBRECARGO          VARCHAR(50)          not null,
   constraint PK_CARGO_POSTULANTE primary key (IDPOSTULANTE, IDDIRECCION)
);

/*==============================================================*/
/* Index: CARGO_POSTULANTE_PK                                   */
/*==============================================================*/
create unique index CARGO_POSTULANTE_PK on CARGO_POSTULANTE (
IDPOSTULANTE,
IDDIRECCION
);

/*==============================================================*/
/* Index: TIENE_FK                                              */
/*==============================================================*/
create  index TIENE_FK on CARGO_POSTULANTE (
IDDIRECCION
);

/*==============================================================*/
/* Index: OCUPA_FK                                              */
/*==============================================================*/
create  index OCUPA_FK on CARGO_POSTULANTE (
IDPOSTULANTE
);

/*==============================================================*/
/* Table: COMITEEVALUADOR                                       */
/*==============================================================*/
create table COMITEEVALUADOR (
   IDCOMITEEVALUADOR    VARCHAR(50)          not null,
   PAISCOMITE           VARCHAR(50)          not null,
   NOMBRECOMPLETOEVALUADOR VARCHAR(100)         not null,
   INSTITUCIONEVALUADOR VARCHAR(50)          not null,
   constraint PK_COMITEEVALUADOR primary key (IDCOMITEEVALUADOR)
);

/*==============================================================*/
/* Index: COMITEEVALUADOR_PK                                    */
/*==============================================================*/
create unique index COMITEEVALUADOR_PK on COMITEEVALUADOR (
IDCOMITEEVALUADOR
);

/*==============================================================*/
/* Table: CONSULTORIA                                           */
/*==============================================================*/
create table CONSULTORIA (
   IDPOSTULANTE         INT4                 not null,
   IDEXPERIENCIA        INT4                 not null,
   DESCRIPCIONCONSULTORIA VARCHAR(200)         not null,
   DURACIONCONSULTORIA  INT4                 not null,
   ANOCONSULTORIA       INT4                 not null,
   AREACONSULTORIA      VARCHAR(50)          not null,
   CAMPOCONSULTORIA     VARCHAR(50)          not null,
   DISCIPLINACONSULTORIA VARCHAR(50)          not null,
   constraint PK_CONSULTORIA primary key (IDPOSTULANTE, IDEXPERIENCIA)
);

/*==============================================================*/
/* Index: CONSULTORIA_PK                                        */
/*==============================================================*/
create unique index CONSULTORIA_PK on CONSULTORIA (
IDPOSTULANTE,
IDEXPERIENCIA
);

/*==============================================================*/
/* Table: DATOS_POSTULANTE                                      */
/*==============================================================*/
create table DATOS_POSTULANTE (
   IDPOSTULANTE         SERIAL               not null,
   NOMBRESPOSTULANTE    VARCHAR(50)          not null,
   APELLIDOSPOSTULANTE  VARCHAR(50)          not null,
   FECHANACPOSTULANTE   TIMESTAMP                 not null,
   C_I_POSTULANTE       INT4                 not null,
   SEXOPOSTULANTE       sexo         not null,
   NACIONALIDAD         VARCHAR(50)          not null,
   LUGARNACPOSTULANTE   VARCHAR(50)          not null,
   DIRECCIONPOSTULANTE  VARCHAR(100)         not null,
   TELEFONOPOSTULANTE   INT4                 not null,
   CELULARPOSTULANTE    INT4                 not null,
   EMAILPOSTULANTE      VARCHAR(50)          not null,
   GRADOACADEMICOPOSTULANTE nivel_academico          not null,
   SITIOWEBPOSTULANTE   VARCHAR(30)          not null,
   constraint PK_DATOS_POSTULANTE primary key (IDPOSTULANTE)
);

/*==============================================================*/
/* Index: DATOS_POSTULANTE_PK                                   */
/*==============================================================*/
create unique index DATOS_POSTULANTE_PK on DATOS_POSTULANTE (
IDPOSTULANTE
);

/*==============================================================*/
/* Table: DIRECCION_INSTITUCIONAL                               */
/*==============================================================*/
create table DIRECCION_INSTITUCIONAL (
   IDDIRECCION          SERIAL               not null,
   NOMBREFACULTAD       VARCHAR(50)          not null,
   UNIDADACADEMICA      VARCHAR(50)          not null,
   SIGLAUNIDADACEDEMICA VARCHAR(10)          not null,
   RESOLUCIONCREACION   INT4                 not null,
   CATEGORIAUNIDAD      VARCHAR(50)          not null,
   constraint PK_DIRECCION_INSTITUCIONAL primary key (IDDIRECCION)
);

/*==============================================================*/
/* Index: DIRECCION_INSTITUCIONAL_PK                            */
/*==============================================================*/
create unique index DIRECCION_INSTITUCIONAL_PK on DIRECCION_INSTITUCIONAL (
IDDIRECCION
);

/*==============================================================*/
/* Table: PR_EVENTOSCIENTIFICOS                                    */
/*==============================================================*/
create table PR_EVENTOSCIENTIFICOS (
   IDPOSTULANTE         INT4                 not null,
   IDPRODUCCION         INT4                 not null,
   DIVULGACIONEVENTOCIENTIFICO medio_divulgacion          not null,
   NOMBREEVENTOCIENTIFICO VARCHAR(50)          not null,
   EDITORIALEVENTOCIENTIFICO VARCHAR(50)          not null,
   ISBNEVENTOCIENTIFICO VARCHAR(50)          not null,
   PAGINAINICIALEVENTOCIENTIFICO INT4                 not null,
   PAGINAFINALEVENTOCIENTIFICO INT4                 not null,
   CLASIFICACIONEVENTOCIENTIFICO clasificacion_evento          not null,
   AREATRABAJOEVENTOCIENTIFICO VARCHAR(50)          not null,
   CAMPOEVENTOCIENTIFICO VARCHAR(50)          not null,
   DISCIPLINAEVENTOCIENTIFICO VARCHAR(50)          not null,
   TIPOEVENTOCIENTIFICO VARCHAR(30)          not null,
   constraint PK_EVENTOSCIENTIFICOS primary key (IDPOSTULANTE, IDPRODUCCION)
);

/*==============================================================*/
/* Index: EVENTOSCIENTIFICOS_PK                                 */
/*==============================================================*/
create unique index EVENTOSCIENTIFICOS_PK on PR_EVENTOSCIENTIFICOS (
IDPOSTULANTE,
IDPRODUCCION
);

/*==============================================================*/
/* Table: EVENTOS_CIENTIFICOS                                   */
/*==============================================================*/
create table EVENTOS_CIENTIFICOS (
   IDPOSTULANTE         INT4                 not null,
   IDEXPERIENCIA        INT4                 not null,
   IDEVENTOCIENTIFICO         SERIAL               not null,
   CLASIFICACIONEVENTOCIENTIFICO clasificacion_evento          not null,
   FECHAINICEVENTOCIENTIFICO DATE                 not null,
   DURACIONEVENTOCIENTIFICO INT4                 not null,
   SITIOWEBEVENTOCIENTIFICO VARCHAR(100)         not null,
   TIPOEVENTOCIENTIFICO tipo_participacion          not null,
   TITULOEXPOSICION     VARCHAR(50)          null,
   ESAUSPICIO           BOOL                 not null,
   PROGRAMA             VARCHAR(50)          not null,
   AREAEVENTOCIENTIFICO VARCHAR(50)          not null,
   CAMPOEVENTOCIENTIFICO VARCHAR(50)          not null,
   DISCIPLINAEVENTOCIENTIFICO VARCHAR(50)          not null,
   constraint PK_EVENTOS_CIENTIFICOS primary key (IDPOSTULANTE, IDEXPERIENCIA, IDEVENTOCIENTIFICO)
);

/*==============================================================*/
/* Index: EVENTOS_CIENTIFICOS_PK                                */
/*==============================================================*/
create unique index EVENTOS_CIENTIFICOS_PK on EVENTOS_CIENTIFICOS (
IDPOSTULANTE,
IDEXPERIENCIA,
IDEVENTOCIENTIFICO
);

/*==============================================================*/
/* Index: PUDO_SER_FK                                           */
/*==============================================================*/
create  index PUDO_SER_FK on EVENTOS_CIENTIFICOS (
IDPOSTULANTE,
IDEXPERIENCIA
);

/*==============================================================*/
/* Table: EXPERIENCIA                                           */
/*==============================================================*/
create table EXPERIENCIA (
   IDPOSTULANTE         INT4                 not null,
   IDEXPERIENCIA        SERIAL               not null,
   PAISEXPERIENCIA      VARCHAR(50)          not null,
   INSTITUCIONEXPERIENCIA VARCHAR(50)          not null,
   constraint PK_EXPERIENCIA primary key (IDPOSTULANTE, IDEXPERIENCIA)
);

/*==============================================================*/
/* Index: EXPERIENCIA_PK                                        */
/*==============================================================*/
create unique index EXPERIENCIA_PK on EXPERIENCIA (
IDPOSTULANTE,
IDEXPERIENCIA
);

/*==============================================================*/
/* Index: CUENTA_FK                                             */
/*==============================================================*/
create  index CUENTA_FK on EXPERIENCIA (
IDPOSTULANTE
);

/*==============================================================*/
/* Table: FINANZAS                                              */
/*==============================================================*/
create table FINANZAS (
   IDPOSTULANTE         INT4                 not null,
   IDEXPERIENCIA        INT4                 not null,
   IDFINANZAS           SERIAL               not null,
   SIGLAFINANZA         VARCHAR(10)          not null,
   NOMBRFINANZA         VARCHAR(50)          not null,
   MONTOFINANZA         DECIMAL(7,2)         not null,
   constraint PK_FINANZAS primary key (IDPOSTULANTE, IDEXPERIENCIA, IDFINANZAS)
);

/*==============================================================*/
/* Index: FINANZAS_PK                                           */
/*==============================================================*/
create unique index FINANZAS_PK on FINANZAS (
IDPOSTULANTE,
IDEXPERIENCIA,
IDFINANZAS
);

/*==============================================================*/
/* Index: FINANCIADOPOR_FK                                      */
/*==============================================================*/
create  index FINANCIADOPOR_FK on FINANZAS (
IDPOSTULANTE,
IDEXPERIENCIA
);

/*==============================================================*/
/* Table: FORMACION_ACADEMICA                                   */
/*==============================================================*/
create table FORMACION_ACADEMICA (
   IDPOSTULANTE         INT4                 not null,
   IDFORMACION          SERIAL               not null,
   NIVELFORMACION       VARCHAR(30)          not null,
   NOMBREINSTITUCION    VARCHAR(50)          not null,
   PAISFORMACION        VARCHAR(30)          not null,
   NOMPROGRAMFORMACION  VARCHAR(50)          not null,
   DURACIONFORMACION    INT4                 not null,
   FECHAFORMACION       DATE                 not null,
   TITULOTRABAJOFORMACION VARCHAR(100)         not null,
   constraint PK_FORMACION_ACADEMICA primary key (IDPOSTULANTE, IDFORMACION)
);

/*==============================================================*/
/* Index: FORMACION_ACADEMICA_PK                                */
/*==============================================================*/
create unique index FORMACION_ACADEMICA_PK on FORMACION_ACADEMICA (
IDPOSTULANTE,
IDFORMACION
);

/*==============================================================*/
/* Index: RECIBIO_FK                                            */
/*==============================================================*/
create  index RECIBIO_FK on FORMACION_ACADEMICA (
IDPOSTULANTE
);

/*==============================================================*/
/* Table: IDIOMAS                                               */
/*==============================================================*/
create table IDIOMAS (
   IDPOSTULANTE         INT4                 not null,
   IDIDIOMA             SERIAL               not null,
   NOMBREIDIOMA         VARCHAR(20)          not null,
   LECTURAIDIOMAR       nivel_manejo        not null,
   ESCRITURAIDIOMA      nivel_manejo          not null,
   FLUIDEZIDIOMA        nivel_manejo         not null,
   constraint PK_IDIOMAS primary key (IDPOSTULANTE, IDIDIOMA)
);

/*==============================================================*/
/* Index: IDIOMAS_PK                                            */
/*==============================================================*/
create unique index IDIOMAS_PK on IDIOMAS (
IDPOSTULANTE,
IDIDIOMA
);

/*==============================================================*/
/* Index: DOMINA_FK                                             */
/*==============================================================*/
create  index DOMINA_FK on IDIOMAS (
IDPOSTULANTE
);

/*==============================================================*/
/* Table: INFORMESTECNICOS                                      */
/*==============================================================*/
create table INFORMESTECNICOS (
   IDPOSTULANTE         INT4                 not null,
   IDPRODUCCION         INT4                 not null,
   INSTITUDICONINFORMETECNICO VARCHAR(100)         not null,
   constraint PK_INFORMESTECNICOS primary key (IDPOSTULANTE, IDPRODUCCION)
);

/*==============================================================*/
/* Index: INFORMESTECNICOS_PK                                   */
/*==============================================================*/
create unique index INFORMESTECNICOS_PK on INFORMESTECNICOS (
IDPOSTULANTE,
IDPRODUCCION
);

/*==============================================================*/
/* Table: INTEGRANTESPRODUCCION                                 */
/*==============================================================*/
create table INTEGRANTESPRODUCCION (
   IDPOSTULANTE         INT4                 not null,
   IDPRODUCCION         INT4                 not null,
   IDAUTOR              VARCHAR(50)          not null,
   constraint PK_INTEGRANTESPRODUCCION primary key (IDPOSTULANTE, IDPRODUCCION, IDAUTOR)
);

/*==============================================================*/
/* Index: INTEGRANTESPRODUCCION_PK                              */
/*==============================================================*/
create unique index INTEGRANTESPRODUCCION_PK on INTEGRANTESPRODUCCION (
IDPOSTULANTE,
IDPRODUCCION,
IDAUTOR
);

/*==============================================================*/
/* Index: CONFORMAN3_FK                                         */
/*==============================================================*/
create  index CONFORMAN3_FK on INTEGRANTESPRODUCCION (
IDAUTOR
);

/*==============================================================*/
/* Index: FORMAN_FK                                             */
/*==============================================================*/
create  index FORMAN_FK on INTEGRANTESPRODUCCION (
IDPOSTULANTE,
IDPRODUCCION
);

/*==============================================================*/
/* Table: INVESTIGACION                                         */
/*==============================================================*/
create table INVESTIGACION (
   IDPOSTULANTE         INT4                 not null,
   IDEXPERIENCIA        INT4                 not null,
   DESCRIPCIONINVESTIGACION descripcion_investigacion         not null,
   NOMBREINVESTIGACION  VARCHAR(100)         not null,
   DURACIONMESESINVESTIGACION INT4                 not null,
   constraint PK_INVESTIGACION primary key (IDPOSTULANTE, IDEXPERIENCIA)
);

/*==============================================================*/
/* Index: INVESTIGACION_PK                                      */
/*==============================================================*/
create unique index INVESTIGACION_PK on INVESTIGACION (
IDPOSTULANTE,
IDEXPERIENCIA
);

/*==============================================================*/
/* Table: INVESTIGADOR                                          */
/*==============================================================*/
create table INVESTIGADOR (
   IDINVESTIGADOR       VARCHAR(50)          not null,
   NOMBRECOMPLETOINVESTIGADOR VARCHAR(100)         not null,
   INSTITUCIONINVESTIGADOR VARCHAR(50)          not null,
   constraint PK_INVESTIGADOR primary key (IDINVESTIGADOR)
);

/*==============================================================*/
/* Index: INVESTIGADOR_PK                                       */
/*==============================================================*/
create unique index INVESTIGADOR_PK on INVESTIGADOR (
IDINVESTIGADOR
);

/*==============================================================*/
/* Table: LIBROSCAPITULOS                                       */
/*==============================================================*/
create table LIBROSCAPITULOS (
   IDPOSTULANTE         INT4                 not null,
   IDPRODUCCION         INT4                 not null,
   MEDIOLIBRO        medio_divulgacion          not null,
   CATEGORIALIBRO       VARCHAR(50)          not null,
   NOMBREEDITORIALLIBRO VARCHAR(50)          not null,
   CIUDADEDITORIALLIBRO VARCHAR(50)          not null,
   NUMEROPAGINASLIBRO   INT4                 not null,
   NUMEROEDICIONLIBRO   INT4                 not null,
   AREALIBRO            VARCHAR(50)          not null,
   CAMPOLIBRO           VARCHAR(50)          not null,
   DISCIPLINALIBRO      VARCHAR(50)          not null,
   constraint PK_LIBROSCAPITULOS primary key (IDPOSTULANTE, IDPRODUCCION)
);

/*==============================================================*/
/* Index: LIBROSCAPITULOS_PK                                    */
/*==============================================================*/
create unique index LIBROSCAPITULOS_PK on LIBROSCAPITULOS (
IDPOSTULANTE,
IDPRODUCCION
);

/*==============================================================*/
/* Table: MIEMBROCOMITEEVALUADOR                                */
/*==============================================================*/
create table MIEMBROCOMITEEVALUADOR (
   IDPOSTULANTE         INT4                 not null,
   IDEXPERIENCIA        INT4                 not null,
   IDEVENTOCIENTIFICO         INT4                 not null,
   IDCOMITEEVALUADOR    VARCHAR(50)          not null,
   constraint PK_MIEMBROCOMITEEVALUADOR primary key (IDPOSTULANTE, IDEXPERIENCIA, IDEVENTOCIENTIFICO, IDCOMITEEVALUADOR)
);

/*==============================================================*/
/* Index: MIEMBROCOMITEEVALUADOR_PK                             */
/*==============================================================*/
create unique index MIEMBROCOMITEEVALUADOR_PK on MIEMBROCOMITEEVALUADOR (
IDPOSTULANTE,
IDEXPERIENCIA,
IDEVENTOCIENTIFICO,
IDCOMITEEVALUADOR
);

/*==============================================================*/
/* Index: CONFORMAN2_FK                                         */
/*==============================================================*/
create  index CONFORMAN2_FK on MIEMBROCOMITEEVALUADOR (
IDCOMITEEVALUADOR
);

/*==============================================================*/
/* Index: EVALUAN_FK                                            */
/*==============================================================*/
create  index EVALUAN_FK on MIEMBROCOMITEEVALUADOR (
IDPOSTULANTE,
IDEXPERIENCIA,
IDEVENTOCIENTIFICO
);

/*==============================================================*/
/* Table: MIEMBROSEQUIPO                                        */
/*==============================================================*/
create table MIEMBROSEQUIPO (
   IDPOSTULANTE         INT4                 not null,
   IDEXPERIENCIA        INT4                 not null,
   IDINVESTIGADOR       VARCHAR(50)          not null,
   RESPONSABLE3         BOOL                 not null,
   constraint PK_MIEMBROSEQUIPO primary key (IDPOSTULANTE, IDEXPERIENCIA, IDINVESTIGADOR)
);

/*==============================================================*/
/* Index: MIEMBROSEQUIPO_PK                                     */
/*==============================================================*/
create unique index MIEMBROSEQUIPO_PK on MIEMBROSEQUIPO (
IDPOSTULANTE,
IDEXPERIENCIA,
IDINVESTIGADOR
);

/*==============================================================*/
/* Index: CONFORMAN_FK                                          */
/*==============================================================*/
create  index CONFORMAN_FK on MIEMBROSEQUIPO (
IDINVESTIGADOR
);

/*==============================================================*/
/* Index: MANEJAN_FK                                            */
/*==============================================================*/
create  index MANEJAN_FK on MIEMBROSEQUIPO (
IDPOSTULANTE,
IDEXPERIENCIA
);

/*==============================================================*/
/* Table: POSGRADO                                              */
/*==============================================================*/
create table POSGRADO (
   IDPOSTULANTE         INT4                 not null,
   IDEXPERIENCIA        INT4                 not null,
   NOMBREPOSGRADO       VARCHAR(50)          not null,
   NIVELPOSGRADO        VARCHAR(50)          not null,
   MODULOSPOSGRADO      INT4                 not null,
   GESTIONESPOSGRADO    INT4                 not null,
   TIPOGESTION          tipo_gestion         not null,
   constraint PK_POSGRADO primary key (IDPOSTULANTE, IDEXPERIENCIA)
);

/*==============================================================*/
/* Index: POSGRADO_PK                                           */
/*==============================================================*/
create unique index POSGRADO_PK on POSGRADO (
IDPOSTULANTE,
IDEXPERIENCIA
);

/*==============================================================*/
/* Table: PREMIOS_Y_TITULOS                                     */
/*==============================================================*/
create table PREMIOS_Y_TITULOS (
   IDPOSTULANTE         INT4                 not null,
   IDEXPERIENCIA        INT4                 not null,
   TITULOPREMIO         VARCHAR(50)          not null,
   PROMOTORPREMIO       VARCHAR(100)         not null,
   TIPOPREMIO           VARCHAR(50)          not null,
   ANOPREMIO            INT4                 not null,
   constraint PK_PREMIOS_Y_TITULOS primary key (IDPOSTULANTE, IDEXPERIENCIA)
);

/*==============================================================*/
/* Index: PREMIOS_Y_TITULOS_PK                                  */
/*==============================================================*/
create unique index PREMIOS_Y_TITULOS_PK on PREMIOS_Y_TITULOS (
IDPOSTULANTE,
IDEXPERIENCIA
);

/*==============================================================*/
/* Table: PROCESOSYMECANISMOS                                   */
/*==============================================================*/
create table PROCESOSYMECANISMOS (
   IDPOSTULANTE         INT4                 not null,
   IDPRODUCCION         INT4                 not null,
   TIPO_PROCESO        tipo_proceso          null,
   FINALIDADPROCESO     VARCHAR(50)          null,
   DISPONIBILIDADPROCESOIRRESTRICA BOOL                 null,
   ESTADOINTELECTUALPROCESO VARCHAR(10)          null,
   ANOPROPIEDADINTELECTUAL INT4                 null,
   BENEFICIARIOPRODUCTO VARCHAR(50)          null,
   ESTADOTRANSFERIDOPRODUCTO VARCHAR(10)          null,
   constraint PK_PROCESOSYMECANISMOS primary key (IDPOSTULANTE, IDPRODUCCION)
);

/*==============================================================*/
/* Index: PROCESOSYMECANISMOS_PK                                */
/*==============================================================*/
create unique index PROCESOSYMECANISMOS_PK on PROCESOSYMECANISMOS (
IDPOSTULANTE,
IDPRODUCCION
);

/*==============================================================*/
/* Table: PRODUCCION                                            */
/*==============================================================*/
create table PRODUCCION (
   IDPOSTULANTE         INT4                 not null,
   IDPRODUCCION         SERIAL               not null,
   TITULOPRODUCCION     VARCHAR(50)          not null,
   ANOPRODUCCION        INT4                 not null,
   IDIOMAPRODUCCION     VARCHAR(30)          null,
   URLPROUDUCCION       VARCHAR(100)         null,
   PAISPRODUCCION       VARCHAR(60)          null,
   constraint PK_PRODUCCION primary key (IDPOSTULANTE, IDPRODUCCION)
);

/*==============================================================*/
/* Index: PRODUCCION_PK                                         */
/*==============================================================*/
create unique index PRODUCCION_PK on PRODUCCION (
IDPOSTULANTE,
IDPRODUCCION
);

/*==============================================================*/
/* Index: PRESENTA_FK                                           */
/*==============================================================*/
create  index PRESENTA_FK on PRODUCCION (
IDPOSTULANTE
);

/*==============================================================*/
/* Table: PRODUCTOSTECNOLOGICOS                                 */
/*==============================================================*/
create table PRODUCTOSTECNOLOGICOS (
   IDPOSTULANTE         INT4                 not null,
   IDPRODUCCION         INT4                 not null,
   TIPOPRODUCTOTECNOLOGICO        tipo_producto          not null,
   CLASEPRODUCTOTECNOLOGICO clase_producto          null,
   FINALIDADPRODUCTOTECNOLOGICO VARCHAR(50)          null,
   DISPONIBILIDADPRODTECNO BOOL                 null,
   ESTADOPRODUCTOTECNOLOGICO VARCHAR(10)          null,
   ANOESTADOPRODUCTOTECNOLOGICO INT4                 null,
   ESTADOPRODUCTOTRANSFERIDO VARCHAR(10)          null,
   BENEFICIARIOPRODUCTOTECNOLOGICO VARCHAR(50)          null,
   constraint PK_PRODUCTOSTECNOLOGICOS primary key (IDPOSTULANTE, IDPRODUCCION)
);

/*==============================================================*/
/* Index: PRODUCTOSTECNOLOGICOS_PK                              */
/*==============================================================*/
create unique index PRODUCTOSTECNOLOGICOS_PK on PRODUCTOSTECNOLOGICOS (
IDPOSTULANTE,
IDPRODUCCION
);

/*==============================================================*/
/* Table: PROYECTOINTERNO                                       */
/*==============================================================*/
create table PROYECTOINTERNO (
   IDPOSTULANTE         INT4                 not null,
   IDEXPERIENCIA        INT4                 not null,
   NOMBREPROYECTO       VARCHAR(100)         not null,
   TIPOPROYECTO         tipo_investigacion_interna          not null,
   FECHAINIPROYECTO     DATE                 not null,
   FECHAFINPROYECTO     DATE                 not null,
   DESCRIPCIONPROYECTO  VARCHAR(200)         not null,
   DISCIPLINAPROYECTO   VARCHAR(50)          not null,
   SECTORPROYECTO       VARCHAR(50)          not null,
   constraint PK_PROYECTOINTERNO primary key (IDPOSTULANTE, IDEXPERIENCIA)
);

/*==============================================================*/
/* Index: PROYECTOINTERNO_PK                                    */
/*==============================================================*/
create unique index PROYECTOINTERNO_PK on PROYECTOINTERNO (
IDPOSTULANTE,
IDEXPERIENCIA
);

/*==============================================================*/
/* Table: SOFTWAREDESARROLLADO                                  */
/*==============================================================*/
create table SOFTWAREDESARROLLADO (
   IDPOSTULANTE         INT4                 not null,
   IDPRODUCCION         INT4                 not null,
   TIPOSOFTWARE        tipo_software          not null,
   FINALIDADSOFTWARE    VARCHAR(50)          not null,
   SISTEMAOPERATIVOREQUERIDO VARCHAR(50)          not null,
   DISPONIBILIDADSOFTWARE BOOL                 not null,
   ESTADOINTELECTUAL    VARCHAR(10)          not null,
   ANOPROPIEDADINTELECTUALSOFTWARE INT4                 null,
   constraint PK_SOFTWAREDESARROLLADO primary key (IDPOSTULANTE, IDPRODUCCION)
);

/*==============================================================*/
/* Index: SOFTWAREDESARROLLADO_PK                               */
/*==============================================================*/
create unique index SOFTWAREDESARROLLADO_PK on SOFTWAREDESARROLLADO (
IDPOSTULANTE,
IDPRODUCCION
);

/*==============================================================*/
/* Table: TUTORIAS                                              */
/*==============================================================*/
create table TUTORIAS (
   IDPOSTULANTE         INT4                 not null,
   IDPRODUCCION         INT4                 not null,
   TIPOTUTORIA        tipo_tutoria          not null,
   TIPOORIENTACIONTUTORIA orientacion_tutoria          not null,
   INSTITUCIONTUTORIA   VARCHAR(50)          not null,
   NOMBREPORGRAMAACADEMICOTUTORIA VARCHAR(50)          not null,
   AREATUTORIA          VARCHAR(50)          not null,
   CAMPOTUTORIA         VARCHAR(50)          not null,
   DISCIPLINATUTORIA    VARCHAR(50)          not null,
   constraint PK_TUTORIAS primary key (IDPOSTULANTE, IDPRODUCCION)
);

/*==============================================================*/
/* Index: TUTORIAS_PK                                           */
/*==============================================================*/
create unique index TUTORIAS_PK on TUTORIAS (
IDPOSTULANTE,
IDPRODUCCION
);

alter table ARTICULOS_CIENTIFICOS
   add constraint FK_ARTICULO_PUBLICA_PRODUCCI foreign key (IDPOSTULANTE, IDPRODUCCION)
      references PRODUCCION (IDPOSTULANTE, IDPRODUCCION)
      on delete restrict on update restrict;

alter table CARGO_POSTULANTE
   add constraint FK_CARGO_PO_OCUPA_DATOS_PO foreign key (IDPOSTULANTE)
      references DATOS_POSTULANTE (IDPOSTULANTE)
      on delete restrict on update restrict;

alter table CARGO_POSTULANTE
   add constraint FK_CARGO_PO_TIENE_DIRECCIO foreign key (IDDIRECCION)
      references DIRECCION_INSTITUCIONAL (IDDIRECCION)
      on delete restrict on update restrict;

alter table CONSULTORIA
   add constraint FK_CONSULTO_ES_UNA_EXPERIEN foreign key (IDPOSTULANTE, IDEXPERIENCIA)
      references EXPERIENCIA (IDPOSTULANTE, IDEXPERIENCIA)
      on delete restrict on update restrict;

alter table PR_EVENTOSCIENTIFICOS
   add constraint FK_EVENTOSC_PARTICIPA_PRODUCCI foreign key (IDPOSTULANTE, IDPRODUCCION)
      references PRODUCCION (IDPOSTULANTE, IDPRODUCCION)
      on delete restrict on update restrict;

alter table EVENTOS_CIENTIFICOS
   add constraint FK_EVENTOS__PUDO_SER_EXPERIEN foreign key (IDPOSTULANTE, IDEXPERIENCIA)
      references EXPERIENCIA (IDPOSTULANTE, IDEXPERIENCIA)
      on delete restrict on update restrict;

alter table EXPERIENCIA
   add constraint FK_EXPERIEN_CUENTA_DATOS_PO foreign key (IDPOSTULANTE)
      references DATOS_POSTULANTE (IDPOSTULANTE)
      on delete restrict on update restrict;

alter table FINANZAS
   add constraint FK_FINANZAS_FINANCIAD_PROYECTO foreign key (IDPOSTULANTE, IDEXPERIENCIA)
      references PROYECTOINTERNO (IDPOSTULANTE, IDEXPERIENCIA)
      on delete restrict on update restrict;

alter table FORMACION_ACADEMICA
   add constraint FK_FORMACIO_RECIBIO_DATOS_PO foreign key (IDPOSTULANTE)
      references DATOS_POSTULANTE (IDPOSTULANTE)
      on delete restrict on update restrict;

alter table IDIOMAS
   add constraint FK_IDIOMAS_DOMINA_DATOS_PO foreign key (IDPOSTULANTE)
      references DATOS_POSTULANTE (IDPOSTULANTE)
      on delete restrict on update restrict;

alter table INFORMESTECNICOS
   add constraint FK_INFORMES_ESCRIBE_PRODUCCI foreign key (IDPOSTULANTE, IDPRODUCCION)
      references PRODUCCION (IDPOSTULANTE, IDPRODUCCION)
      on delete restrict on update restrict;

alter table INTEGRANTESPRODUCCION
   add constraint FK_INTEGRAN_CONFORMAN_AUTORES foreign key (IDAUTOR)
      references AUTORES (IDAUTOR)
      on delete restrict on update restrict;

alter table INTEGRANTESPRODUCCION
   add constraint FK_INTEGRAN_FORMAN_PRODUCCI foreign key (IDPOSTULANTE, IDPRODUCCION)
      references PRODUCCION (IDPOSTULANTE, IDPRODUCCION)
      on delete restrict on update restrict;

alter table INVESTIGACION
   add constraint FK_INVESTIG_PUEDE_SER_EXPERIEN foreign key (IDPOSTULANTE, IDEXPERIENCIA)
      references EXPERIENCIA (IDPOSTULANTE, IDEXPERIENCIA)
      on delete restrict on update restrict;

alter table LIBROSCAPITULOS
   add constraint FK_LIBROSCA_REDACTA_PRODUCCI foreign key (IDPOSTULANTE, IDPRODUCCION)
      references PRODUCCION (IDPOSTULANTE, IDPRODUCCION)
      on delete restrict on update restrict;

alter table MIEMBROCOMITEEVALUADOR
   add constraint FK_MIEMBROC_CONFORMAN_COMITEEV foreign key (IDCOMITEEVALUADOR)
      references COMITEEVALUADOR (IDCOMITEEVALUADOR)
      on delete restrict on update restrict;

alter table MIEMBROCOMITEEVALUADOR
   add constraint FK_MIEMBROC_EVALUAN_EVENTOS_ foreign key (IDPOSTULANTE, IDEXPERIENCIA, IDEVENTOCIENTIFICO)
      references EVENTOS_CIENTIFICOS (IDPOSTULANTE, IDEXPERIENCIA, IDEVENTOCIENTIFICO)
      on delete restrict on update restrict;

alter table MIEMBROSEQUIPO
   add constraint FK_MIEMBROS_CONFORMAN_INVESTIG foreign key (IDINVESTIGADOR)
      references INVESTIGADOR (IDINVESTIGADOR)
      on delete restrict on update restrict;

alter table MIEMBROSEQUIPO
   add constraint FK_MIEMBROS_MANEJAN_PROYECTO foreign key (IDPOSTULANTE, IDEXPERIENCIA)
      references PROYECTOINTERNO (IDPOSTULANTE, IDEXPERIENCIA)
      on delete restrict on update restrict;

alter table POSGRADO
   add constraint FK_POSGRADO_PUEDE_HAB_EXPERIEN foreign key (IDPOSTULANTE, IDEXPERIENCIA)
      references EXPERIENCIA (IDPOSTULANTE, IDEXPERIENCIA)
      on delete restrict on update restrict;

alter table PREMIOS_Y_TITULOS
   add constraint FK_PREMIOS__PUEDE_TEN_EXPERIEN foreign key (IDPOSTULANTE, IDEXPERIENCIA)
      references EXPERIENCIA (IDPOSTULANTE, IDEXPERIENCIA)
      on delete restrict on update restrict;

alter table PROCESOSYMECANISMOS
   add constraint FK_PROCESOS_DISENA_PRODUCCI foreign key (IDPOSTULANTE, IDPRODUCCION)
      references PRODUCCION (IDPOSTULANTE, IDPRODUCCION)
      on delete restrict on update restrict;

alter table PRODUCCION
   add constraint FK_PRODUCCI_PRESENTA_DATOS_PO foreign key (IDPOSTULANTE)
      references DATOS_POSTULANTE (IDPOSTULANTE)
      on delete restrict on update restrict;

alter table PRODUCTOSTECNOLOGICOS
   add constraint FK_PRODUCTO_DESARROLL_PRODUCCI foreign key (IDPOSTULANTE, IDPRODUCCION)
      references PRODUCCION (IDPOSTULANTE, IDPRODUCCION)
      on delete restrict on update restrict;

alter table PROYECTOINTERNO
   add constraint FK_PROYECTO_PODRIA_SE_EXPERIEN foreign key (IDPOSTULANTE, IDEXPERIENCIA)
      references EXPERIENCIA (IDPOSTULANTE, IDEXPERIENCIA)
      on delete restrict on update restrict;

alter table SOFTWAREDESARROLLADO
   add constraint FK_SOFTWARE_PROGRAMA_PRODUCCI foreign key (IDPOSTULANTE, IDPRODUCCION)
      references PRODUCCION (IDPOSTULANTE, IDPRODUCCION)
      on delete restrict on update restrict;

alter table TUTORIAS
   add constraint FK_TUTORIAS_EJERCER_C_PRODUCCI foreign key (IDPOSTULANTE, IDPRODUCCION)
      references PRODUCCION (IDPOSTULANTE, IDPRODUCCION)
      on delete restrict on update restrict;


      
create or replace function rev_nombrprom_trigger() returns trigger as $rev_nombrprom_trigger$
declare
nombre varchar(30) := UPPER(NEW.NOMBR_PROM);
nombreanterior varchar(30) := UPPER(OLD.NOMBR_PROM);
begin

if((TG_OP = 'INSERT') AND ((select count(*) from promocion where UPPER(NOMBR_PROM)=nombre)=1)) then
raise unique_violation USING MESSAGE = 'Nombre de promocion duplicado: ' || NEW.NOMBR_PROM;
elseif((TG_OP = 'UPDATE') AND ((select count(*) from promocion where UPPER(NOMBR_PROM)=nombre)=1) AND (nombreanterior!=nombre)) then
    raise unique_violation USING MESSAGE = 'Nombre de promocion duplicado: ' || NEW.NOMBR_PROM;

else 
   return new;
end if;
commit;
END
$rev_nombrprom_trigger$ LANGUAGE plpgsql;

create trigger rev_nombrprom
before insert or update of nombr_prom ON promocion
for each row
execute procedure rev_nombrprom_trigger();

insert into datos_postulante(NOMBRESPOSTULANTE,APELLIDOSPOSTULANTE,FECHANACPOSTULANTE,C_I_POSTULANTE,SEXOPOSTULANTE,
                     NACIONALIDAD,LUGARNACPOSTULANTE,DIRECCIONPOSTULANTE,TELEFONOPOSTULANTE,CELULARPOSTULANTE,
                     EMAILPOSTULANTE,GRADOACADEMICOPOSTULANTE,SITIOWEBPOSTULANTE) 
values ('Alfredo Samuel','Gomez Lozada','11-11-1959','2594062','Masculino','Peruana','Cusco','C./ San Martin N. 4281',
      '4930721','60283510','alfoSam@gmail.com','Doctorado','-');

