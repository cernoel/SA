
DROP TABLE public.shop;

DROP TABLE public.poi;

CREATE TABLE 
  public.shop(
      id character varying(20)
    , lon real
    , lat real
    , shop character varying(254)
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
      id character varying(20)
    , lon real
    , lat real
    , name character varying(254)
    );

-- COPY csv to table
\copy shop(id, lon, lat, shop, name, city, postcode, street, housenumber, website, email, phone) FROM 'shops.csv' with (format csv,header true,delimiter '|');

\copy poi(id, lat, lon, name) FROM 'graz_poi_complete.csv' with (format csv,header true,delimiter '|');


