drop domain if exists public.unidad_peso cascade;

create domain public.unidad_peso as varchar(20)
check(
value='Kilogramos' or value='Libras' or value='Litros' or value='Galones' or value='Onzas'

);

drop index if exists PRODUCTO_PK;

drop table if exists PRODUCTO;

drop index if exists CATEGORIA_PK;

drop table if exists CATEGORIA;

drop index if exists TIENE_FK;

drop index if exists USUARIO_PK;

drop table if exists USUARIO;

drop index if exists ADMINISTRADOR_PK;

drop table if exists ADMINISTRADOR;

drop index if exists GENERA_FK;



create table ADMINISTRADOR (
   COD_ADMIN            SERIAL               not null,
   NOMBRE_ADMIN         VARCHAR(20)          not null,
   constraint PK_ADMINISTRADOR primary key (COD_ADMIN)
);


create unique index ADMINISTRADOR_PK on ADMINISTRADOR (
COD_ADMIN
);


create table CATEGORIA (
   COD_CAT              SERIAL               not null,
   COD_ADMIN            INT4                 null,
   NOMBRE_CAT           VARCHAR(20)          not null,
   constraint PK_CATEGORIA primary key (COD_CAT)
);


create unique index CATEGORIA_PK on CATEGORIA (
COD_CAT
);


create  index GENERA_FK on CATEGORIA (
COD_ADMIN
);


create table PRODUCTO (
   COD_CAT              INT4                 not null,
   COD_PROD             SERIAL               not null,
   NOMBRE_PROD          VARCHAR(30)          not null,
   DESCRIPCION          VARCHAR(1000)        not null,
   PRECIO_UNID          REAL                 not null,
   PESO                 INT4                 null,
   UNIDAD_MED           unidad_peso          null,
   FECHA_VENC           DATE                 null,
   FECHA_ADIC           DATE                 null,
   CANTIDAD             INT4                 null,
   IMAGEN1              CHAR(254)            null,
   IMAGEN2              CHAR(254)            null,
   IMAGEN3              CHAR(254)            null,
   IMAGEN4              CHAR(254)            null,
   constraint PK_PRODUCTO primary key (COD_CAT, COD_PROD)
);

create unique index PRODUCTO_PK on PRODUCTO (
COD_CAT,
COD_PROD
);


create  index TIENE_FK on PRODUCTO (
COD_CAT
);


create table USUARIO (
   CODI_USER            SERIAL               not null,
   NOM_USER             VARCHAR(20)          not null,
   TIPO_USER            VARCHAR(20)          not null,
   constraint PK_USUARIO primary key (CODI_USER)
);


create unique index USUARIO_PK on USUARIO (
CODI_USER
);

alter table CATEGORIA
   add constraint FK_CATEGORI_GENERA_ADMINIST foreign key (COD_ADMIN)
      references ADMINISTRADOR (COD_ADMIN)
      on delete restrict on update restrict;

alter table PRODUCTO
   add constraint FK_PRODUCTO_TIENE_CATEGORI foreign key (COD_CAT)
      references CATEGORIA (COD_CAT)
      on delete restrict on update restrict;

create or replace function rev_nombre_trigger() returns trigger
as $rev_nombre_trigger$
begin
if(select count(*) from producto where NOMBRE_PROD=NEW.NOMBRE_PROD)=1 then
	return null;
else 
	return new;
end if;
commit;
END
$rev_nombre_trigger$ LANGUAGE plpgsql;

create trigger rev_nombre
before insert or update of NOMBRE_PROD ON producto
for each row
execute procedure rev_nombre_trigger();

insert into usuario(nom_user,tipo_user) values ('Bruce','Cliente');
insert into usuario(nom_user,tipo_user) values ('Martha','Administrador');

insert into administrador(nombre_admin) values ('Martha');

insert into categoria(cod_admin,nombre_cat) values (1,'Farmacia');
insert into categoria(cod_admin,nombre_cat) values (1,'Entretenimiento');
insert into categoria(cod_admin,nombre_cat) values (1,'Alimentos');
insert into categoria(cod_admin,nombre_cat) values (1,'Electronicos');
insert into categoria(cod_admin,nombre_cat) values (1,'Ropa');



insert into producto(cod_cat,nombre_prod,descripcion,precio_unid,peso,unidad_med,fecha_venc,fecha_adic,cantidad)
values (1,'Vendas','Vendas Micropore talla gruesa',38,null,null,null,'2020-5-13',12);

insert into producto(cod_cat,nombre_prod,descripcion,precio_unid,peso,unidad_med,fecha_venc,fecha_adic,cantidad)
values (1,'Rifamicina','Rifamicina en spray presentación de 30 mL ',58,null,null,null,'2020-7-23',5);


insert into producto(cod_cat,nombre_prod,descripcion,precio_unid,peso,unidad_med,fecha_venc,fecha_adic,cantidad)
values (2,'Pelota','Pelota para jugar fútbol',70,null,null,null,'2019-12-24',3);

insert into producto(cod_cat,nombre_prod,descripcion,precio_unid,peso,unidad_med,fecha_venc,fecha_adic,cantidad)
values (2,'Monopolio','Monopolio de Shrek de calidad media',140,null,null,null,'2018-5-7',2);


insert into producto(cod_cat,nombre_prod,descripcion,precio_unid,peso,unidad_med,fecha_venc,fecha_adic,cantidad)
values (3,'Pimienta Negra','Frasco de pimienta negra recien molida de 25 gramos',32,null,null,null,'2020-8-16',7);

insert into producto(cod_cat,nombre_prod,descripcion,precio_unid,peso,unidad_med,fecha_venc,fecha_adic,cantidad)
values (3,'Cebolla en polvo','Frasco de cebolla en polvo de 35 gramos',28.5,null,null,null,'2020-8-16',10);

insert into producto(cod_cat,nombre_prod,descripcion,precio_unid,peso,unidad_med,fecha_venc,fecha_adic,cantidad)
values (3,'Sal','Sal por kilos',35,10,'Kilogramos',null,'2020-2-28',null);

insert into producto(cod_cat,nombre_prod,descripcion,precio_unid,peso,unidad_med,fecha_venc,fecha_adic,cantidad)
values (3,'Manzana','Manzanas verdes por unidad',2,null,null,'2020-10-21','2020-9-21',25);

insert into producto(cod_cat,nombre_prod,descripcion,precio_unid,peso,unidad_med,fecha_venc,fecha_adic,cantidad)
values (3,'Dulce de leche','Bolsa de dulce de leche, grande',23,null,null,'2020-12-21','2020-6-21',7);


insert into producto(cod_cat,nombre_prod,descripcion,precio_unid,peso,unidad_med,fecha_venc,fecha_adic,cantidad)
values (4,'Audifonos','Audifonos Samsung',130,null,null,null,'2020-1-11',10);

insert into producto(cod_cat,nombre_prod,descripcion,precio_unid,peso,unidad_med,fecha_venc,fecha_adic,cantidad)
values (4,'USB','USB marca HP de 8GB',67,null,null,null,'2020-1-2',4);


insert into producto(cod_cat,nombre_prod,descripcion,precio_unid,peso,unidad_med,fecha_venc,fecha_adic,cantidad)
values (5,'Zapatos NIKE','Zapatos NIKE color blanco con negro ',135,null,null,null,'2019-11-24',6);

insert into producto(cod_cat,nombre_prod,descripcion,precio_unid,peso,unidad_med,fecha_venc,fecha_adic,cantidad)
values (5,'Chamarra ADIDAS','Chamarra ADIDAS talla L',187,null,null,null,'2020-4-15',3);







INSERT INTO categoria (cod_admin, nombre_cat) SELECT 1, $3 WHERE NOT EXISTS (SELECT nombre_cat FROM categoria WHERE nombre_cat = $3);
INSERT INTO producto (cod_cat, nombre_prod, descripcion, precio_unid, peso, unidad_med, fecha_venc, fecha_adic, cantidad)
SELECT c.cod_cat, $1, $2, $4, $7, $8, $9, CURRENT_DATE, $6
FROM categoria c, producto p
WHERE c.nombre_cat=$3 AND c.cod_cat=p.cod_cat;







