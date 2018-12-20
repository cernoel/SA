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