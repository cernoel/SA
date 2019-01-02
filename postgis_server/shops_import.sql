CREATE TABLE 
  public.shop(
      id BIGSERIAL PRIMARY KEY
    , lon real
    , lat real
    , shoptype character varying(254)
    , city character varying(254)
    , name character varying(254)
    , postcode character varying(20)
    , street character varying(254)
    , housenumber character varying(20)
    , website character varying(254)
    , email character varying(254)
    , phone character varying(254)
    );
    
CREATE TABLE 
  public.poi(
      id character varying(20) PRIMARY KEY
    , lon real
    , lat real
    , name character varying(254)
    );

-- COPY csv to table
\copy shop(id, lon, lat, shop, name, city, postcode, street, housenumber, website, email, phone) FROM '/tmp/shops.csv' with (format csv,header true,delimiter '|');

\copy poi(id, lat, lon, name) FROM '/tmp/graz_poi_complete.csv' with (format csv,header true,delimiter '|');

CREATE FUNCTION shopsbypoi(text, int) RETURNS TABLE(id bigint, lon real, lat real, shoptype text, city text, name text, postcode text, street text, housenumber text, website text, email text, phone text)
    AS $$ 	
	SELECT 	id,
		lon,
		lat,
		shoptype,
		city,
		name,
		postcode,
		street,
		housenumber,
		website,
		email,
		phone 
	FROM 	shop 
	WHERE 	ST_DWithin(ST_Point(shop.lon, shop.lat),
		(SELECT ST_Point(poi.lon, poi.lat) FROM public.poi WHERE poi.id = $1)::geometry, $2, true)
		$$
    LANGUAGE SQL;


CREATE VIEW public.poi_geo AS
 SELECT 
	poi.id,
    	public.st_point((poi.lon)::double precision, (poi.lat)::double precision) AS st_point
FROM 
	public.poi;


CREATE VIEW public.shop_geo AS
SELECT 
	shop.id,
    	public.st_point((shop.lon)::double precision, (shop.lat)::double precision) AS st_point
FROM 
	public.shop;


CREATE VIEW public.shop_poi_distance AS
SELECT 
	s.id AS shopid,
    	p.id AS poiid,
    	public.st_distance_sphere(s.st_point, p.st_point) AS distance
FROM 
	public.poi_geo p,
    	public.shop_geo s;

CREATE VIEW public.poi_shop_distance_data AS 
SELECT 
	poi.name as poiname,
	shop.lon as lon,
	shop.lat as lat,
	shop.name as shopname, 
	shop.shoptype as shoptype,
	shop.city as city,
	shop.postcode as postcode,
	shop.street as street,
	shop.housenumber as housenumber,
	shop.website as website,
	shop.email as email,
	shop.phone as phone,
	shop_poi_distance.distance as distance
FROM 
	shop_poi_distance, 
	shop, 
	poi
WHERE 
	shop_poi_distance.shopid = shop.id 
AND     shop_poi_distance.poiid = poi.id;

