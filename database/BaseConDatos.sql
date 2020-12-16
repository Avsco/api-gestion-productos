drop domain if exists public.unidad_peso cascade;

create domain public.unidad_peso as varchar(20)
check(
value='Kilogramos' or value='Libras' or value='Litros' or value='Galones' or value='Onzas'
);

create or replace function bytea_import(p_path text, p_result out bytea) 
                       language plpgsql as $$
    declare
      l_oid oid;
    begin
      select lo_import(p_path) into l_oid;
      select lo_get(l_oid) INTO p_result;
      perform lo_unlink(l_oid);
    end;$$;


drop index if exists USUARIO_PK;
drop table if exists USUARIO;

drop index if exists REPRESENTANDO_FK;
drop index if exists IMAGEN_PK;
drop table if exists IMAGEN;

drop index if exists DESCUENTO_PK;
drop table if exists DESCUENTO;


drop index if exists ES_PARTE_DE_FK;
drop index if exists CONTIENE_FK;
drop index if exists PROD_PROM_PK;
drop table if exists PROD_PROM;

drop index if exists TIENE_FK;
drop index if exists PRODUCTO_PK;
drop table if exists PRODUCTO;

drop index if exists GENERA_FK;
drop index if exists CATEGORIA_PK;
drop table if exists CATEGORIA;

drop index if exists ADMINISTRADOR_PK;
drop table if exists ADMINISTRADOR;

drop index if exists PROMOCION_PK;
drop table if exists PROMOCION;


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


create index GENERA_FK on CATEGORIA (
COD_ADMIN
);


create table DESCUENTO (
   COD_PROD             INT4                 not null,
   PORCENTAJE           DECIMAL(4,2)         not null,
   CANTIDAD_REQ         INT4                 not null,
   constraint PK_DESCUENTO primary key (COD_PROD)
);


create unique index DESCUENTO_PK on DESCUENTO (
COD_PROD
);


create table IMAGEN (
   COD_PROD             INT4                 not null,
   NUM_PIC              SERIAL               not null,
   IMAGEN              varchar            null,
 constraint PK_IMAGEN primary key (COD_PROD, NUM_PIC)
);


create unique index IMAGEN_PK on IMAGEN (
COD_PROD,
NUM_PIC
);

create  index REPRESENTANDO_FK on IMAGEN (
COD_PROD
);


create table PRODUCTO (
   COD_PROD             SERIAL               not null,
   COD_CAT              INT4                 not null,
   NOMBRE_PROD          VARCHAR(30)          not null,
   DESCRIPCION          VARCHAR(1000)        not null,
   PRECIO_UNID          DECIMAL(7,2)         not null,
   PESO                 INT4                 null,
   UNIDAD_MED           unidad_peso             null,
   FECHA_VENC           DATE                 null,
   FECHA_ADIC           DATE                 null,
   CANTIDAD             INT4                 null,
   constraint PK_PRODUCTO primary key (COD_PROD)
);


create unique index PRODUCTO_PK on PRODUCTO (
COD_PROD
);


create  index TIENE_FK on PRODUCTO (
COD_CAT
);


create table PROD_PROM (
   COD_PROD             INT4                 not null,
   COD_PROM             INT4                 not null,
   CANT_PROD		INT4                 not null,
   constraint PK_PROD_PROM primary key (COD_PROD, COD_PROM)
);


create unique index PROD_PROM_PK on PROD_PROM (
COD_PROD,
COD_PROM
);


create  index CONTIENE_FK on PROD_PROM (
COD_PROM
);

create  index ES_PARTE_DE_FK on PROD_PROM (
COD_PROD
);


create table PROMOCION (
   COD_PROM             SERIAL               not null,
   NOMBR_PROM           VARCHAR(30)          not null,
   DESCRIP_PROM          VARCHAR(1000)        not null,
	CANTIDAD_PROM       INT4 not null,
	 PRECIO_PROM          DECIMAL(7,2)         not null,
	FECHA_INI            DATE                 not null,
   FECHA_FIN            DATE                 not null,
	IMAGEN_PROM          varchar            null,
   constraint PK_PROMOCION primary key (COD_PROM)
);


create unique index PROMOCION_PK on PROMOCION (
COD_PROM
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
   add constraint FK_CATEGORI_CREA_ADMINIST foreign key (COD_ADMIN)
      references ADMINISTRADOR (COD_ADMIN)
      on delete restrict on update restrict;

alter table DESCUENTO
   add constraint FK_DESCUENT_PODRIA_TE_PRODUCTO foreign key (COD_PROD)
      references PRODUCTO (COD_PROD)
      on delete restrict on update restrict;

alter table IMAGEN
   add constraint FK_IMAGEN_RELATIONS_PRODUCTO foreign key (COD_PROD)
      references PRODUCTO (COD_PROD)
      on delete restrict on update restrict;

alter table PRODUCTO
   add constraint FK_PRODUCTO_TIENE_CATEGORI foreign key (COD_CAT)
      references CATEGORIA (COD_CAT)
      on delete restrict on update restrict;

alter table PROD_PROM
   add constraint FK_PROD_PRO_CONTIENE_PROMOCIO foreign key (COD_PROM)
      references PROMOCION (COD_PROM)
      on delete restrict on update restrict;

alter table PROD_PROM
   add constraint FK_PROD_PRO_ES_PARTE__PRODUCTO foreign key (COD_PROD)
      references PRODUCTO (COD_PROD)
      on delete restrict on update restrict;



create or replace function rev_nombre_trigger() returns trigger as $rev_nombre_trigger$
declare
nombre varchar(30) := UPPER(NEW.NOMBRE_PROD);
nombreanterior varchar(30) := UPPER(OLD.NOMBRE_PROD);
begin
if((TG_OP = 'INSERT') AND ((select count(*) from producto where UPPER(NOMBRE_PROD)=nombre)=1)) then
raise unique_violation USING MESSAGE = 'Nombre de producto duplicado: ' || NEW.NOMBRE_PROD;
elseif( (TG_OP = 'UPDATE') AND ((select count(*) from producto where UPPER(NOMBRE_PROD)=nombre)=1) AND (nombreanterior!=nombre)) then
    raise unique_violation USING MESSAGE = 'Nombre de producto duplicado: ' || NEW.NOMBRE_PROD;
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


create or replace function rev_nombrcat_trigger() returns trigger as $rev_nombrcat_trigger$
declare
nombre varchar(20) := UPPER(NEW.NOMBRE_CAT);
nombreanterior varchar(20) := UPPER(OLD.NOMBRE_CAT);
begin
	
if((TG_OP = 'INSERT') AND ((select count(*) from categoria where UPPER(NOMBRE_CAT)=nombre)=1)) then
raise unique_violation USING MESSAGE = 'Nombre de categoria duplicado: ' || NEW.NOMBRE_CAT;
elseif((TG_OP = 'UPDATE') AND ((select count(*) from categoria where UPPER(NOMBRE_CAT)=nombre)=1) AND (nombreanterior!=nombre)) then
    raise unique_violation USING MESSAGE = 'Nombre de categoria duplicado: ' || NEW.NOMBRE_CAT;
	
	
else 
	return new;
end if;
commit;
END
$rev_nombrcat_trigger$ LANGUAGE plpgsql;

create trigger rev_nombrcat
before insert or update of nombre_cat ON categoria
for each row
execute procedure rev_nombrcat_trigger();




create or replace function rev_img_trigger() returns trigger as $rev_img_trigger$
begin
if((select count(*) from imagen where cod_prod=NEW.cod_prod)=4) then
    raise unique_violation USING MESSAGE = 'Limite de imagenes alcanzado para el producto '|| (select p.NOMBRE_PROD
																							 from producto p
																							 where p.cod_prod=new.cod_prod);
	
else 
	return new;
end if;
commit;
END
$rev_img_trigger$ LANGUAGE plpgsql;

create trigger rev_img
before insert or update of cod_prod ON imagen
for each row
execute procedure rev_img_trigger();

create or replace function rev_descu_trigger() returns trigger as $rev_descu_trigger$
begin
if((select count(*) from descuento where cod_prod=NEW.cod_prod)=1) then
    raise unique_violation USING MESSAGE = 'Limite de descuentos para el producto '|| (select p.NOMBRE_PROD
																							 from producto p
																							 where p.cod_prod=new.cod_prod);
	
else 
	return new;
end if;
commit;
END
$rev_descu_trigger$ LANGUAGE plpgsql;

create trigger rev_descu
before insert or update of cod_prod ON descuento
for each row
execute procedure rev_descu_trigger();

create or replace function rev_cantdesc_trigger() returns trigger as $rev_cantdesc_trigger$
begin
if((select cantidad from producto where cod_prod=NEW.cod_prod)<NEW.cantidad_req) then
    raise unique_violation USING MESSAGE = 'No tienes suficientes unidades del producto '|| (select p.NOMBRE_PROD
																							 from producto p
																							 where p.cod_prod=new.cod_prod) || ' Para ese descuento';

else 
	return new;
end if;
commit;
END
$rev_cantdesc_trigger$ LANGUAGE plpgsql;

create trigger cantdesc
before insert or update of cantidad_req ON descuento
for each row
execute procedure rev_cantdesc_trigger();

create or replace function rev_numprom_trigger() returns trigger as $rev_numprom_trigger$
begin
if((select count(*) from prod_prom where cod_prom=NEW.cod_prom)=5) then
    raise unique_violation USING MESSAGE = 'No puedes añadir más productos a la promocion '|| (select p.NOMBR_PROM
																							 from promocion p
																							 where p.cod_prom=new.cod_prom);	
else 
	return new;
end if;
commit;
END
$rev_numprom_trigger$ LANGUAGE plpgsql;

create trigger numprom
before insert or update of cod_prom ON prod_prom
for each row
execute procedure rev_numprom_trigger();

create or replace function rev_fechaprom_trigger() returns trigger as $rev_fechaprom_trigger$
declare 
resProd date := (select pr.fecha_venc from producto pr where pr.cod_prod=NEW.cod_prod);
resProm date := (select pr.fecha_fin from promocion pr where pr.cod_prom=NEW.cod_prom);
begin
if(((resProd) is not null) AND (resProd<resProm)) then
   raise unique_violation USING MESSAGE = 'El producto ' || (select p.NOMBRE_PROD from producto p where p.cod_prod=new.cod_prod) || ' vence antes de que acabe la promocion ' || (select p.nombr_prom from promocion p where p.cod_prom=new.cod_prom) ;
	
else 
	return new;
end if;
commit;
END
$rev_fechaprom_trigger$ LANGUAGE plpgsql;

create trigger fechaprom
before insert or update of cod_prom ON prod_prom
for each row
execute procedure rev_fechaprom_trigger();


insert into usuario(nom_user,tipo_user) values ('Bruce','Cliente');
insert into usuario(nom_user,tipo_user) values ('Martha','Administrador');

insert into administrador(nombre_admin) values ('Martha');

insert into categoria(cod_admin,nombre_cat) values (1,'Farmacia');
insert into categoria(cod_admin,nombre_cat) values (1,'Entretenimiento');
insert into categoria(cod_admin,nombre_cat) values (1,'Alimentos');
insert into categoria(cod_admin,nombre_cat) values (1,'Electronicos');
insert into categoria(cod_admin,nombre_cat) values (1,'Ropa');






/* encode((select imagen1 from imagen where cod_prod = 1), 'base64')*/
insert into producto(cod_cat,nombre_prod,descripcion,precio_unid,peso,unidad_med,fecha_venc,fecha_adic,cantidad)
values (1,'Vendas','Vendas Micropore talla gruesa',38,null,null,null,'2020-5-13',28);
insert into imagen(cod_prod,imagen) values ((select cod_prod from producto where nombre_prod = 'Vendas'),encode((bytea_import('D:\BD\Fotos\vendas.jpg')),'base64'));


insert into producto(cod_cat,nombre_prod,descripcion,precio_unid,peso,unidad_med,fecha_venc,fecha_adic,cantidad)
values (1,'Rifamicina','Rifamicina en spray presentación de 30 mL ',58,null,null,null,'2020-7-23',42);
insert into imagen(cod_prod,imagen) values ((select cod_prod from producto where nombre_prod = 'Rifamicina'),encode((bytea_import('D:\BD\Fotos\rifamicina.jpg')),'base64'));


insert into producto(cod_cat,nombre_prod,descripcion,precio_unid,peso,unidad_med,fecha_venc,fecha_adic,cantidad)
values (2,'Pelota','Pelota para jugar fútbol',70,null,null,null,'2019-12-24',13);
insert into imagen(cod_prod,imagen) values ((select cod_prod from producto where nombre_prod = 'Pelota'),encode((bytea_import('D:\BD\Fotos\pelota.jpg')),'base64'));

insert into producto(cod_cat,nombre_prod,descripcion,precio_unid,peso,unidad_med,fecha_venc,fecha_adic,cantidad)
values (2,'Monopolio','Monopolio de Shrek de calidad media',140,null,null,null,'2018-5-7',12);
insert into imagen(cod_prod,imagen) values ((select cod_prod from producto where nombre_prod = 'Monopolio'),encode((bytea_import('D:\BD\Fotos\monopolio.jpg')),'base64'));


insert into producto(cod_cat,nombre_prod,descripcion,precio_unid,peso,unidad_med,fecha_venc,fecha_adic,cantidad)
values (3,'Pimienta Negra','Frasco de pimienta negra recien molida de 25 gramos',32,null,null,null,'2020-8-16',20);
insert into imagen(cod_prod,imagen) values ((select cod_prod from producto where nombre_prod = 'Pimienta Negra'),encode((bytea_import('D:\BD\Fotos\pimienta.png')),'base64'));

insert into producto(cod_cat,nombre_prod,descripcion,precio_unid,peso,unidad_med,fecha_venc,fecha_adic,cantidad)
values (3,'Cebolla en polvo','Frasco de cebolla en polvo de 35 gramos',28.9,null,null,null,'2020-8-16',20);
insert into imagen(cod_prod,imagen) values ((select cod_prod from producto where nombre_prod = 'Cebolla en polvo'),encode((bytea_import('D:\BD\Fotos\cebolla1.jpg')),'base64'));
insert into imagen(cod_prod,imagen) values ((select cod_prod from producto where nombre_prod = 'Cebolla en polvo'),encode((bytea_import('D:\BD\Fotos\cebolla2.jpg')),'base64'));
insert into imagen(cod_prod,imagen) values ((select cod_prod from producto where nombre_prod = 'Cebolla en polvo'),encode((bytea_import('D:\BD\Fotos\cebolla3.jpg')),'base64'));
insert into imagen(cod_prod,imagen) values ((select cod_prod from producto where nombre_prod = 'Cebolla en polvo'),encode((bytea_import('D:\BD\Fotos\cebolla4.jpg')),'base64'));


insert into producto(cod_cat,nombre_prod,descripcion,precio_unid,peso,unidad_med,fecha_venc,fecha_adic,cantidad)
values (3,'Sal','Sal por kilos',35,10,'Kilogramos',null,'2020-2-28',null);
insert into imagen(cod_prod,imagen) values ((select cod_prod from producto where nombre_prod = 'Sal'),encode((bytea_import('D:\BD\Fotos\sal.jpg')),'base64'));

insert into producto(cod_cat,nombre_prod,descripcion,precio_unid,peso,unidad_med,fecha_venc,fecha_adic,cantidad)
values (3,'Manzana','Manzanas verdes por unidad',2,null,null,'2020-10-21','2020-9-21',35);
insert into imagen(cod_prod,imagen) values ((select cod_prod from producto where nombre_prod = 'Manzana'),encode((bytea_import('D:\BD\Fotos\manzana.jpg')),'base64'));

insert into producto(cod_cat,nombre_prod,descripcion,precio_unid,peso,unidad_med,fecha_venc,fecha_adic,cantidad)
values (3,'Dulce de leche','Bolsa de dulce de leche, grande',23,null,null,'2020-12-21','2020-6-21',17);
insert into imagen(cod_prod,imagen) values ((select cod_prod from producto where nombre_prod = 'Dulce de leche'),encode((bytea_import('D:\BD\Fotos\dulcedeleche.jpg')),'base64'));

insert into producto(cod_cat,nombre_prod,descripcion,precio_unid,peso,unidad_med,fecha_venc,fecha_adic,cantidad)
values (3,'Hamburguesas','Hamburguesas Fridosa',40,null,null,null,'2018-6-7',20);
insert into imagen(cod_prod,imagen) values ((select cod_prod from producto where nombre_prod = 'Hamburguesas'),encode((bytea_import('D:\BD\Fotos\hamburguesa.png')),'base64'));

insert into producto(cod_cat,nombre_prod,descripcion,precio_unid,peso,unidad_med,fecha_venc,fecha_adic,cantidad)
values (3,'Refresco del Valle','Botella de refresco de jugo del valle',10,null,null,null,'2018-6-7',15);
insert into imagen(cod_prod,imagen) values ((select cod_prod from producto where nombre_prod = 'Refresco del Valle'),encode((bytea_import('D:\BD\Fotos\valle.jpg')),'base64'));





insert into producto(cod_cat,nombre_prod,descripcion,precio_unid,peso,unidad_med,fecha_venc,fecha_adic,cantidad)
values (4,'Audifonos','Audifonos Samsung',130,null,null,null,'2020-1-11',20);
insert into imagen(cod_prod,imagen) values ((select cod_prod from producto where nombre_prod = 'Audifonos'),encode((bytea_import('D:\BD\Fotos\audifonos.jpg')),'base64'));

insert into producto(cod_cat,nombre_prod,descripcion,precio_unid,peso,unidad_med,fecha_venc,fecha_adic,cantidad)
values (4,'USB','USB marca HP de 8GB',67,null,null,null,'2020-1-2',14);
insert into imagen(cod_prod,imagen) values ((select cod_prod from producto where nombre_prod = 'USB'),encode((bytea_import('D:\BD\Fotos\usb.jpg')),'base64'));


insert into producto(cod_cat,nombre_prod,descripcion,precio_unid,peso,unidad_med,fecha_venc,fecha_adic,cantidad)
values (5,'Zapatos NIKE','Zapatos NIKE color blanco con negro ',135,null,null,null,'2019-11-24',16);
insert into imagen(cod_prod,imagen) values ((select cod_prod from producto where nombre_prod = 'Zapatos NIKE'),encode((bytea_import('D:\BD\Fotos\zapatos.jpg')),'base64'));

insert into producto(cod_cat,nombre_prod,descripcion,precio_unid,peso,unidad_med,fecha_venc,fecha_adic,cantidad)
values (5,'Chamarra ADIDAS','Chamarra ADIDAS talla L',187,null,null,null,'2020-4-15',13);
insert into imagen(cod_prod,imagen) values ((select cod_prod from producto where nombre_prod = 'Chamarra ADIDAS'),encode((bytea_import('D:\BD\Fotos\chamarra.jpg')),'base64'));

insert into producto(cod_cat,nombre_prod,descripcion,precio_unid,peso,unidad_med,fecha_venc,fecha_adic,cantidad)
values (5,'Crocs mcqueen','Crocs del rayo mcqueen con luz',60,null,null,null,'2020-5-20',30);
insert into imagen(cod_prod,imagen) values ((select cod_prod from producto where nombre_prod = 'Crocs mcqueen'),encode((bytea_import('D:\BD\Fotos\crocs.png')),'base64'));


insert into producto(cod_cat,nombre_prod,descripcion,precio_unid,peso,unidad_med,fecha_venc,fecha_adic,cantidad)
values (3,'Paprika','Frasco de paprika molida de 23 gramos',25,null,null,null,'2020-11-4',17);
insert into imagen(cod_prod,imagen) values ((select cod_prod from producto where nombre_prod = 'Paprika'),encode((bytea_import('D:\BD\Fotos\paprika.jpg')),'base64'));

insert into producto(cod_cat,nombre_prod,descripcion,precio_unid,peso,unidad_med,fecha_venc,fecha_adic,cantidad)
values (1,'Prontosan','Prontosan para la rápida regeneración de heridas',70,null,null,null,'2020-1-1',3);
insert into imagen(cod_prod,imagen) values ((select cod_prod from producto where nombre_prod = 'Prontosan'),encode((bytea_import('D:\BD\Fotos\prontosan.jpg')),'base64'));

insert into producto(cod_cat,nombre_prod,descripcion,precio_unid,peso,unidad_med,fecha_venc,fecha_adic,cantidad)
values (2,'Monopolio de Mario','Monopolio de Mario en buen estado',130,null,null,null,'2018-6-7',18);
insert into imagen(cod_prod,imagen) values ((select cod_prod from producto where nombre_prod = 'Monopolio de Mario'),encode((bytea_import('D:\BD\Fotos\monopolio2.jpg')),'base64'));






insert into descuento values (13,50,3);
insert into descuento values (12,50,3);
insert into descuento values (3,40,2);
insert into descuento values (10,20,6);


insert into promocion(nombr_prom,descrip_prom,cantidad_prom,precio_prom,fecha_ini,fecha_fin,imagen_prom) 
values ('Combo especias','Llévese el combo de cebolla molida y pimienta a un precio reducido',4,55,NOW(),'20-12-2020',encode((bytea_import('D:\BD\Fotos\prom1.jpg')),'base64'));

insert into prod_prom values(6,1,3);
insert into prod_prom values(5,1,5);

insert into promocion(nombr_prom,descrip_prom,cantidad_prom,precio_prom,fecha_ini,fecha_fin,imagen_prom) 
values ('Combo botiquín','Un paquete con rifamicina y vendas micropore',7,30.5,NOW(),'30-12-2020',encode((bytea_import('D:\BD\Fotos\prom2.jpg')),'base64'));

insert into prod_prom(cod_prod,cod_prom,cant_prod) values(1,2,4);
insert into prod_prom(cod_prod,cod_prom,cant_prod) values(2,2,6);