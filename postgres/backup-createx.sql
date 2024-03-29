PGDMP         (    
            {            createx    12.14    12.14 �    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    33201    createx    DATABASE     �   CREATE DATABASE createx WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Russian_Russia.1251' LC_CTYPE = 'Russian_Russia.1251';
    DROP DATABASE createx;
                postgres    false            b           1247    33205    c_product_characteristic_value    TYPE     �   CREATE TYPE public.c_product_characteristic_value AS (
	characteristic_type_id integer,
	characteristic_name character varying,
	characteristic_value jsonb,
	characteristic_view jsonb
);
 1   DROP TYPE public.c_product_characteristic_value;
       public          postgres    false            e           1247    33208    c_cart_product    TYPE     -  CREATE TYPE public.c_cart_product AS (
	product_id integer,
	product_characteristic_id integer,
	quantity integer,
	product_name text,
	image_preview character varying,
	characteristic_values public.c_product_characteristic_value[],
	price numeric,
	price_with_discount numeric,
	discount smallint
);
 !   DROP TYPE public.c_cart_product;
       public          postgres    false    610            �           1247    33211    c_favorites_product    TYPE       CREATE TYPE public.c_favorites_product AS (
	product_id integer,
	product_characteristic_id integer,
	product_name text,
	image_preview character varying,
	characteristic_values public.c_product_characteristic_value[],
	price numeric,
	price_with_discount numeric,
	discount smallint
);
 &   DROP TYPE public.c_favorites_product;
       public          postgres    false    610            �           1247    33214    c_product_attribute    TYPE     �   CREATE TYPE public.c_product_attribute AS (
	attribute_type_id integer,
	attribute_name character varying,
	attribute_value jsonb,
	attribute_view jsonb
);
 &   DROP TYPE public.c_product_attribute;
       public          postgres    false            �           1247    33217    c_product_characteristic    TYPE     �   CREATE TYPE public.c_product_characteristic AS (
	characteristic_id integer,
	product_variant_id integer,
	characteristic_values public.c_product_characteristic_value[]
);
 +   DROP TYPE public.c_product_characteristic;
       public          postgres    false    610            �           1247    33220    c_product_price    TYPE     �   CREATE TYPE public.c_product_price AS (
	characteristic_id integer,
	price numeric,
	price_with_discount numeric,
	discount smallint
);
 "   DROP TYPE public.c_product_price;
       public          postgres    false            �           1247    33223    c_product_variant    TYPE     �   CREATE TYPE public.c_product_variant AS (
	product_variant_id integer,
	sku character varying,
	image_preview character varying,
	images character varying[]
);
 $   DROP TYPE public.c_product_variant;
       public          postgres    false            �           1247    33226 	   c_product    TYPE     h  CREATE TYPE public.c_product AS (
	requested_variant_id integer,
	product_id integer,
	product_name character varying,
	rating integer,
	description character varying,
	prices public.c_product_price[],
	product_attributes public.c_product_attribute[],
	product_characteristics public.c_product_characteristic[],
	product_variants public.c_product_variant[]
);
    DROP TYPE public.c_product;
       public          postgres    false    713    707    704    710            �           1247    33229    c_product_price_filter    TYPE     M   CREATE TYPE public.c_product_price_filter AS (
	min numeric,
	max numeric
);
 )   DROP TYPE public.c_product_price_filter;
       public          postgres    false            �           1247    33232    c_product_tag_filter_value    TYPE     i   CREATE TYPE public.c_product_tag_filter_value AS (
	tag text,
	tag_view json,
	elements_number bigint
);
 -   DROP TYPE public.c_product_tag_filter_value;
       public          postgres    false            �           1247    33235    c_product_tag_filter    TYPE     ~   CREATE TYPE public.c_product_tag_filter AS (
	filter_id text,
	filter_name text,
	tags public.c_product_tag_filter_value[]
);
 '   DROP TYPE public.c_product_tag_filter;
       public          postgres    false    722            �           1247    33238    c_product_filters    TYPE     �   CREATE TYPE public.c_product_filters AS (
	tag_filters public.c_product_tag_filter[],
	price_filter public.c_product_price_filter
);
 $   DROP TYPE public.c_product_filters;
       public          postgres    false    719    725            �           1247    33241    c_product_sort    TYPE     B   CREATE TYPE public.c_product_sort AS (
	id integer,
	name text
);
 !   DROP TYPE public.c_product_sort;
       public          postgres    false            �           1247    33244    c_product_catalog    TYPE     �   CREATE TYPE public.c_product_catalog AS (
	elements_number bigint,
	elements public.c_product[],
	filters public.c_product_filters,
	sort public.c_product_sort[]
);
 $   DROP TYPE public.c_product_catalog;
       public          postgres    false    728    731    716            �           1247    33247    c_product_categories    TYPE     h   CREATE TYPE public.c_product_categories AS (
	category_id integer,
	category_name text,
	childs json
);
 '   DROP TYPE public.c_product_categories;
       public          postgres    false            �           1247    33250    c_product_id_variant_id    TYPE     d   CREATE TYPE public.c_product_id_variant_id AS (
	product_id integer,
	product_variant_id integer
);
 *   DROP TYPE public.c_product_id_variant_id;
       public          postgres    false            �           1247    33253    c_user    TYPE     �   CREATE TYPE public.c_user AS (
	user_id integer,
	first_name text,
	last_name text,
	email text,
	password text,
	password_updated_at timestamp without time zone
);
    DROP TYPE public.c_user;
       public          postgres    false            �           1247    33256    c_user_cart_fav_id    TYPE     f   CREATE TYPE public.c_user_cart_fav_id AS (
	product_id integer,
	product_characteristic_id integer
);
 %   DROP TYPE public.c_user_cart_fav_id;
       public          postgres    false            �           1247    33259    c_user_cart_fav_ids    TYPE     s   CREATE TYPE public.c_user_cart_fav_ids AS (
	cart public.c_user_cart_fav_id[],
	fav public.c_user_cart_fav_id[]
);
 &   DROP TYPE public.c_user_cart_fav_ids;
       public          postgres    false    746    746                       1255    33639    create_url(text)    FUNCTION     �   CREATE FUNCTION public.create_url(p_path text) RETURNS text
    LANGUAGE plpgsql
    AS $$ 
begin
	return 'http://api/assets/' || trim(leading '/' from p_path);
end;
$$;
 .   DROP FUNCTION public.create_url(p_path text);
       public          postgres    false                       1255    33261    get_cart_products(json)    FUNCTION     �  CREATE FUNCTION public.get_cart_products(p_ids json) RETURNS public.c_cart_product[]
    LANGUAGE plpgsql
    AS $$
declare
	v_res c_cart_product[];
begin 
	with cte_products as (
		select * from json_to_recordset(p_ids) as (
			product_id int,
			product_characteristic_id int,
			quantity int
		)
	), cte_prices as (
		select product_id, product_characteristic_id, price, price_with_discount, discount 
		from product_prices
		where product_id in (select product_id from cte_products)
	), cte_characteristics as (
		select 
			pf.product_id,
			pf.product_characteristic_id,
			pf.product_variant_id,
			array_agg(row(
					pfv.product_characteristic_type_id,
					pft.characteristic_name,
					pfd.characteristic_value,
					pfd.characteristic_value_view
				)::c_product_characteristic_value
			) as c_product_characteristic
		from product_characteristics as pf
		join cte_prices using(product_characteristic_id)
		join product_characteristic_values as pfv using(product_characteristic_id)
		join product_characteristic_types as pft on pft.product_characteristic_type_id = pfv.product_characteristic_type_id			
		join product_characteristic_value_directory as pfd on pfd.product_characteristic_value_directory_id = pfv.product_characteristic_value_directory_id
		where pf.product_id in (select product_id from cte_products )
		group by pf.product_id, pf.product_characteristic_id,pf.product_variant_id, cte_prices.price, cte_prices.discount
	)
	select 
	array_agg(
		row(
			cte_products.product_id,
			cte_products.product_characteristic_id,
			quantity,
			product_name,
			create_url(image_preview),
			c_product_characteristic,
			price,
			price_with_discount,
			discount
		)::c_cart_product
	)
	from cte_products
	join products using(product_id) 
	join cte_characteristics on products.product_id = cte_characteristics.product_id and cte_products.product_characteristic_id = cte_characteristics.product_characteristic_id
	join product_variants using(product_variant_id)
	join cte_prices on products.product_id = cte_prices.product_id and cte_prices.product_characteristic_id = cte_characteristics.product_characteristic_id
	into v_res;
	
	return coalesce(v_res, array[]::c_cart_product[]);
	
end;
$$;
 4   DROP FUNCTION public.get_cart_products(p_ids json);
       public          postgres    false    613            	           1255    33262    get_favorites_products(json)    FUNCTION     �  CREATE FUNCTION public.get_favorites_products(p_ids json) RETURNS public.c_favorites_product[]
    LANGUAGE plpgsql
    AS $$
declare
	v_res c_favorites_product[];
begin 
	with cte_products as (
		select * from json_to_recordset(p_ids) as (
			product_id int,
			product_characteristic_id int
		)
	), cte_prices as (
		select product_id, product_characteristic_id, price, price_with_discount, discount 
		from product_prices
		where product_id in (select product_id from cte_products)
	), cte_characteristics as (
		select 
			pf.product_id,
			pf.product_characteristic_id,
			pf.product_variant_id,
			array_agg(row(
					pfv.product_characteristic_type_id,
					pft.characteristic_name,
					pfd.characteristic_value,
					pfd.characteristic_value_view
				)::c_product_characteristic_value
			) as c_product_characteristic
		from product_characteristics as pf
		join cte_prices using(product_characteristic_id)
		join product_characteristic_values as pfv using(product_characteristic_id)
		join product_characteristic_types as pft on pft.product_characteristic_type_id = pfv.product_characteristic_type_id			
		join product_characteristic_value_directory as pfd on pfd.product_characteristic_value_directory_id = pfv.product_characteristic_value_directory_id
		where pf.product_id in (select product_id from cte_products )
		group by pf.product_id, pf.product_characteristic_id,pf.product_variant_id, cte_prices.price, cte_prices.discount
	)
	select 
	array_agg(
		row(
			cte_products.product_id,
			cte_products.product_characteristic_id,
			product_name,
			create_url(image_preview),
			c_product_characteristic,
			price,
			price_with_discount,
			discount
		)::c_favorites_product
	)
	from cte_products
	join products using(product_id) 
	join cte_characteristics on products.product_id = cte_characteristics.product_id and cte_products.product_characteristic_id = cte_characteristics.product_characteristic_id
	join product_variants using(product_variant_id)
	join cte_prices on products.product_id = cte_prices.product_id and cte_prices.product_characteristic_id = cte_characteristics.product_characteristic_id
	into v_res;
	
	return coalesce(v_res, array[]::c_favorites_product[]);
	
end;
$$;
 9   DROP FUNCTION public.get_favorites_products(p_ids json);
       public          postgres    false    701                       1255    33263 =   get_filtered_products(json, public.c_product_id_variant_id[])    FUNCTION     �  CREATE FUNCTION public.get_filtered_products(p_filters json, p_products public.c_product_id_variant_id[]) RETURNS public.c_product_id_variant_id[]
    LANGUAGE plpgsql
    AS $_$
declare
	v_matched_tags_filters_dyn text = '';
	v_not_matched_tags_filters_dyn text = '';
	v_tag_filters json;
	v_price_filter json;
	v_rec json;
	v_res c_product_id_variant_id[];
begin
	
	v_tag_filters = p_filters->>'tag_filters';
	v_price_filter = p_filters->>'price_filter';
	
	for v_rec in (select * from json_array_elements(v_tag_filters)) loop
		continue when json_array_length(v_rec->'tags') = 0;
		v_matched_tags_filters_dyn = case when v_matched_tags_filters_dyn = '' then ' where ' else v_matched_tags_filters_dyn || ' or ' end; 
		v_matched_tags_filters_dyn = v_matched_tags_filters_dyn || 'product_tag_type_id = ' || quote_literal(v_rec->>'filter_id') || 
		' and product_tag in (' 
		|| (select  string_agg(quote_literal(value), ',') from json_array_elements_text(v_rec->'tags')) || 
		')';
	end loop;
	v_matched_tags_filters_dyn = case when json_array_length(v_tag_filters) = 0 then 'limit 0' else v_matched_tags_filters_dyn end;
	v_not_matched_tags_filters_dyn = replace(v_matched_tags_filters_dyn, 'product_tag in', 'product_tag not in');
	
	execute $$ 
	with found_tags as (
		select * from product_tags
		where product_id in (select product_id from unnest($$|| quote_literal(p_products) ||$$ ::c_product_id_variant_id[]))
	), matched_tags as (
		select * from found_tags 
		$$|| v_matched_tags_filters_dyn ||$$ 
	), not_matched_tags as (
		select * from found_tags 
		$$|| v_not_matched_tags_filters_dyn ||$$ 
	), filtered_products as (
		select aa.product_id, aa.product_variant_id
		from found_tags
		join (
			select * 
			from unnest( $$|| quote_literal(p_products) ||$$ ::c_product_id_variant_id[])
		) aa using (product_id, product_variant_id)	
		where aa.product_id not in (
			select product_id 
			from not_matched_tags
			where product_tag_type_id not in (
				select product_tag_type_id 
				from matched_tags
				where product_id = not_matched_tags.product_id
			)
			and product_variant_id is null
		)
		and aa.product_variant_id not in (
			select product_variant_id 
			from not_matched_tags
			where product_tag_type_id not in (
				select product_tag_type_id 
				from matched_tags
				where product_variant_id = not_matched_tags.product_variant_id
			)
			and product_variant_id is not null
		)
		$$||
		case when v_price_filter is not null then
			$$ and aa.product_variant_id in (
				select product_variant_id
				from product_prices
				join product_characteristics using (product_characteristic_id)
				where price_with_discount between $$|| quote_literal((v_price_filter->>'start')::int) ||$$ and 
									$$|| quote_literal((v_price_filter->>'end')::int) ||$$
			) $$
		else ''
		end
		||$$
		group by aa.product_id, aa.product_variant_id
	)
	select array_agg(row(product_id, product_variant_id)::c_product_id_variant_id) 
	from filtered_products
	$$ into v_res;
	
	return coalesce(v_res, array[]::c_product_id_variant_id[]);
end; 
$_$;
 i   DROP FUNCTION public.get_filtered_products(p_filters json, p_products public.c_product_id_variant_id[]);
       public          postgres    false    740    740                       1255    33264 @   get_product_catalog_by_category_id(json, integer, integer, json)    FUNCTION     �  CREATE FUNCTION public.get_product_catalog_by_category_id(p_filters json, p_sort integer, p_category_id integer, p_pagination json) RETURNS public.c_product_catalog[]
    LANGUAGE plpgsql
    AS $$
declare 
	v_res c_product_catalog[];
begin

	with products_arr as (
		select coalesce(array_agg(row(product_id, product_variant_id)::c_product_id_variant_id), array[]::c_product_id_variant_id[]) as single_item
		from products 
		join product_variants using(product_id) 
		join product_categories using(product_type_id)
		where product_category_id = p_category_id
	), filtered_products as (
		select get_filtered_products(p_filters, (select single_item from products_arr)) as single_item
	)
	select array_agg(row((select cardinality(single_item) from filtered_products),
			  	get_products(
					get_ranked_products(
						(select single_item from filtered_products),
						p_sort,
						null
					), 
					p_pagination
				),
			  	get_product_filters(p_filters, (select single_item from products_arr)),
			   (select array_agg(row(product_sort_id, sort_name)::c_product_sort) from products_sort)
			  )::c_product_catalog)
	into v_res;
	
	return v_res;
end; 
$$;
 �   DROP FUNCTION public.get_product_catalog_by_category_id(p_filters json, p_sort integer, p_category_id integer, p_pagination json);
       public          postgres    false    734                       1255    33265 =   get_product_catalog_by_search_text(json, integer, text, json)    FUNCTION     H  CREATE FUNCTION public.get_product_catalog_by_search_text(p_filters json, p_sort integer, p_search_text text, p_pagination json) RETURNS public.c_product_catalog[]
    LANGUAGE plpgsql
    AS $$
declare 
	v_res c_product_catalog[];
begin

	with products_arr as (
		select coalesce(array_agg(row(product_id, product_variant_id)::c_product_id_variant_id), array[]::c_product_id_variant_id[]) as single_item
		from product_variants 
		where plainto_tsquery('english', p_search_text) @@ tsv
	), filtered_products as (
		select get_filtered_products(p_filters, (select single_item from products_arr)) as single_item
	)
	select array_agg(row((select cardinality(single_item) from filtered_products),
			  	get_products(
					get_ranked_products(
						(select single_item from filtered_products),
						p_sort,
						p_search_text
					), 
					p_pagination
				),
			  	get_product_filters(p_filters, (select single_item from products_arr)),
			   (select array_agg(row(product_sort_id, sort_name)::c_product_sort) from products_sort)
			  )::c_product_catalog)
	into v_res;
	
	return v_res;
end;
$$;
 �   DROP FUNCTION public.get_product_catalog_by_search_text(p_filters json, p_sort integer, p_search_text text, p_pagination json);
       public          postgres    false    734                       1255    33266    get_product_categories(integer)    FUNCTION     �  CREATE FUNCTION public.get_product_categories(p_parent_id integer DEFAULT NULL::integer) RETURNS public.c_product_categories[]
    LANGUAGE plpgsql
    AS $$
declare 
	v_res c_product_categories[];
	v_childs c_product_categories[];
	v_rec record;
begin
	for v_rec in (select * from product_categories 
				  where case when p_parent_id is null 
				  			then parent_category is null
				 			else parent_category = p_parent_id
				 		end) loop
		v_childs = get_product_categories(v_rec.product_category_id);
		v_res = array_append(v_res,row(v_rec.product_category_id, v_rec.category_name, to_json(v_childs))::c_product_categories);
	end loop;
	return coalesce( v_res, array[]::c_product_categories[]);
end;
$$;
 B   DROP FUNCTION public.get_product_categories(p_parent_id integer);
       public          postgres    false    737                       1255    33267 ;   get_product_filters(json, public.c_product_id_variant_id[])    FUNCTION     �(  CREATE FUNCTION public.get_product_filters(p_filters json, p_products public.c_product_id_variant_id[]) RETURNS public.c_product_filters
    LANGUAGE plpgsql
    AS $_$ 
declare
	v_matched_tags_dyn text = '';
	v_not_matched_tags_dyn text = '';
	v_json json;
	v_rec record;
	v_tag_filters_json json;
	v_price_filter_json json;
	v_tag_filters c_product_tag_filter[];
	v_price_filter c_product_price_filter;
	v_variant_defining_tag_type_ids text[];
begin					
	v_tag_filters_json = p_filters->>'tag_filters';
	v_price_filter_json = p_filters->>'price_filter';

	v_variant_defining_tag_type_ids =  (					 
		select coalesce(array_agg(product_tag_type_id), array[]::text[])
		from json_array_elements(v_tag_filters_json)	
		join product_tag_types on product_tag_type_id = ("value"->>'filter_id')
		where defining_variant = true
	);

	create temp table found_tags as 
	with p_products as (
		select * from unnest(p_products)
	)
	select * 
	from product_tags
	where product_id in (select product_id from p_products)
	and product_variant_id is null
	union
	select * 
	from product_tags
	where product_variant_id in (select product_variant_id from p_products);
	
	
	
	for v_json in (select * from json_array_elements(v_tag_filters_json)) loop
		continue when json_array_length(v_json->'tags') = 0;
		v_matched_tags_dyn = case when v_matched_tags_dyn = '' then '' else v_matched_tags_dyn || ' or ' end; 
		v_matched_tags_dyn = v_matched_tags_dyn || 'product_tag_type_id = ' || quote_literal(v_json->>'filter_id') || 
		' and product_tag in (' 
		|| (select  string_agg(quote_literal(value), ',') from json_array_elements_text(v_json->'tags')) || 
		')';
	end loop;
	
	v_not_matched_tags_dyn = replace(v_matched_tags_dyn, 'product_tag in', 'product_tag not in');

	execute $$
	with matched_tags as (
		select * from found_tags 
		$$|| case when v_matched_tags_dyn = '' then '' else 'where ' || v_matched_tags_dyn end ||$$ 
	), not_matched_tags as (
		select * from found_tags ft
		where not exists (
			select * 
			from matched_tags
			where case when ft.product_variant_id is null then
				product_id = ft.product_id
			else
				product_variant_id = ft.product_variant_id
			end
			and product_tag_type_id = ft.product_tag_type_id
		)
		$$|| case when v_not_matched_tags_dyn = '' then 'limit 0' 
			else 'and (' || v_not_matched_tags_dyn || ')' end  ||$$ 
	), filtration_stage_1 as (
		select product_id, product_variant_id, product_tag_type_id, product_tag
		from found_tags
		where 
			case when product_variant_id is null then 
				product_id not in (
					select product_id 
					from not_matched_tags
					where product_variant_id is null
				)
			else 
				product_variant_id not in (
					select product_variant_id 
					from not_matched_tags
					where product_variant_id is not null
				)
			end	
		group by product_id, product_variant_id, product_tag_type_id, product_tag
	), filtration_stage_2 as (
		select * from filtration_stage_1
		$$ || 
		case when cardinality(v_variant_defining_tag_type_ids) > 0 then
			'where product_id in (select product_id from filtration_stage_1 where product_variant_id is not null)'
		else 
			''
		end
		|| $$
	)
	select coalesce(min(price_with_discount), 0), coalesce(max(price_with_discount),1000)
	from product_prices
	$$ ||
	case when cardinality(v_variant_defining_tag_type_ids) > 0 then
	$$ 	join product_characteristics using (product_characteristic_id)
		where product_variant_id in (select product_variant_id from filtration_stage_2 where product_variant_id is not null) $$
	else 
	$$	where product_id in (select product_id from filtration_stage_2) $$
	end 
	into v_price_filter;	
	



	execute $$ 
	create temp table products_filtered_by_tags as
	with matched_tags as (
		select * from found_tags 
		$$|| case when v_matched_tags_dyn = '' then '' else 'where ' || v_matched_tags_dyn end ||$$ 
	), not_matched_tags as (
		select * from found_tags ft
		where not exists (
			select * 
			from matched_tags
			where case when ft.product_variant_id is null then
				product_id = ft.product_id
			else
				product_variant_id = ft.product_variant_id
			end
			and product_tag_type_id = ft.product_tag_type_id
		)
		$$|| case when v_not_matched_tags_dyn = '' then 'limit 0' 
			else 'and (' || v_not_matched_tags_dyn || ')' end  ||$$ 
	), filtration_stage_1 as (
		select product_id, product_variant_id, product_tag_type_id, product_tag
		from found_tags
		where 
			case when product_variant_id is null then 
				product_id not in (
					select product_id 
					from not_matched_tags
					where product_variant_id is null
				)
			else 
				product_variant_id not in (
					select product_variant_id 
					from not_matched_tags
					where product_variant_id is not null
				)
			end	
		group by product_id, product_variant_id, product_tag_type_id, product_tag
	), filtration_stage_2 as (
		$$||
		case when v_price_filter_json is not null then
		$$
		with prices as (
			select product_prices.product_id, product_variant_id
			from product_prices	
			join product_characteristics using (product_characteristic_id)
			where product_prices.product_id in (select product_id from filtration_stage_1)
			and price_with_discount between $$ || (v_price_filter_json->>'start')::int || $$ and 
								$$ || (v_price_filter_json->>'end')::int || $$ 
		)
		select * from filtration_stage_1
		where 
			case when product_variant_id is null then 
				product_id in (
					select product_id 
					from prices
				)
			else 
				product_variant_id in (
					select product_variant_id 
					from prices
				)
			end	
		$$
		else $$ select * from filtration_stage_1 $$
		end
		||$$
	)
	select * from filtration_stage_2
	where product_tag_type_id not in (select "value"->>'filter_id' 
								from json_array_elements($$||quote_literal(v_tag_filters_json)||$$))
	$$ || 
	case when cardinality(v_variant_defining_tag_type_ids) > 0 then
		'and product_id in (select product_id from filtration_stage_2 where product_variant_id is not null)'
	else 
		''
	end
	;
	
	
	
	
	
	for v_rec in select "value"->>'filter_id' as product_tag_type_id from json_array_elements(v_tag_filters_json) loop
		v_matched_tags_dyn = '';
		for v_json in (select * from json_array_elements(v_tag_filters_json)) loop
			continue when v_json->>'filter_id' = v_rec.product_tag_type_id or json_array_length(v_json->'tags') = 0;
			v_matched_tags_dyn = case when v_matched_tags_dyn = '' then '' else v_matched_tags_dyn || ' or ' end; 
			v_matched_tags_dyn = v_matched_tags_dyn || 'product_tag_type_id = ' || quote_literal(v_json->>'filter_id') || 
			' and product_tag in (' 
			|| (select  string_agg(quote_literal(value), ',') from json_array_elements_text(v_json->'tags')) || 
			')';
		end loop;

		v_not_matched_tags_dyn = replace(v_matched_tags_dyn, 'product_tag in', 'product_tag not in');

		execute $$ 
		with matched_tags as (
			select * from found_tags 
			$$|| case when v_matched_tags_dyn = '' then '' else 'where ' || v_matched_tags_dyn end ||$$ 
		), not_matched_tags as (
			select * from found_tags ft
			where not exists (
				select * 
				from matched_tags
				where case when ft.product_variant_id is null then
					product_id = ft.product_id
				else
					product_variant_id = ft.product_variant_id
				end
				and product_tag_type_id = ft.product_tag_type_id
			)
			$$|| case when v_not_matched_tags_dyn = '' then 'limit 0' 
				else 'and (' || v_not_matched_tags_dyn || ')' end  ||$$ 
		), filtration_stage_1 as (
			select product_id, product_variant_id, product_tag_type_id, product_tag
			from found_tags
			where 
				case when product_variant_id is null then 
					product_id not in (
						select product_id 
						from not_matched_tags
						where product_variant_id is null
					)
				else 
					product_variant_id not in (
						select product_variant_id 
						from not_matched_tags
						where product_variant_id is not null
					)
				end	
			group by product_id, product_variant_id, product_tag_type_id, product_tag
		), filtration_stage_2 as (
			$$||
			case when v_price_filter_json is not null then
			$$
			with prices as (
				select product_prices.product_id, product_variant_id
				from product_prices	
				join product_characteristics using (product_characteristic_id)
				where product_prices.product_id in (select product_id from filtration_stage_1)
				and price_with_discount between $$ || (v_price_filter_json->>'start')::int || $$ and 
									$$ || (v_price_filter_json->>'end')::int || $$ 
			)
			select * from filtration_stage_1
			where 
				case when product_variant_id is null then 
					product_id in (
						select product_id 
						from prices
					)
				else 
					product_variant_id in (
						select product_variant_id 
						from prices
					)
				end	
			$$
			else $$ select * from filtration_stage_1 $$
			end
			||$$
		)
		insert into products_filtered_by_tags
		select * from filtration_stage_2
		where product_tag_type_id = $$|| quote_literal(v_rec.product_tag_type_id) ||$$
		$$ || 
		case when cardinality(v_variant_defining_tag_type_ids) > 0 then
			'and product_id in (select product_id from filtration_stage_2 where product_variant_id is not null)'
		else 
			''
		end
		;
		
	end loop;

	

	with match_tags_elems_num as (
		select product_tag_type_id,product_tag, count(*) as match_elems_num
		from products_filtered_by_tags
		group by product_tag_type_id, product_tag
	), buffer as (
		select row(product_tag_type_id, product_tag_type_name, array_agg(tag_filter_value))::c_product_tag_filter
			from (
				select 
					ft.product_tag_type_id, 
					ft.product_tag_type_name, 
					row( ft.product_tag, ft.product_tag_view, case when match_elems_num is null 
														then 0 
														else match_elems_num 
														end)::c_product_tag_filter_value as tag_filter_value
				from (select product_tag_type_id, product_tag_type_name, product_tag, product_tag_view
					  from found_tags 
					  join product_tag_types using(product_tag_type_id)
					  group by product_tag_type_id, product_tag_type_name, product_tag, product_tag_view
					 ) ft
				left join match_tags_elems_num mten on ft.product_tag_type_id = mten.product_tag_type_id 
													and ft.product_tag = mten.product_tag
				order by ft.product_tag
			) aa
		group by product_tag_type_id, product_tag_type_name
	)
	select array(select * from buffer)
	into v_tag_filters;

	drop table if exists found_tags, products_filtered_by_tags;
	return row(v_tag_filters, v_price_filter);
	
end;
$_$;
 g   DROP FUNCTION public.get_product_filters(p_filters json, p_products public.c_product_id_variant_id[]);
       public          postgres    false    728    740                       1255    33269 4   get_products(public.c_product_id_variant_id[], json)    FUNCTION     �  CREATE FUNCTION public.get_products(p_ids public.c_product_id_variant_id[], p_pagination json DEFAULT NULL::json) RETURNS public.c_product[]
    LANGUAGE plpgsql
    AS $_$
declare
	v_res c_product[];
begin

 execute $$
	with paginated_products as (
		select * from unnest($$ || quote_literal(p_ids) || $$::c_product_id_variant_id[]) with ordinality
		$$ ||
		case when p_pagination is not null then
			'limit ' || (p_pagination->>'limit')::int ||
			'offset ' || (p_pagination->>'offset')::int
		else ''
		end
		|| $$
	), attrs as (
		select 
			pav.product_id,
			row(
				pav.product_attribute_type_id,
				pat.attribute_name,
				coalesce(pav.attribute_value, "pad".attribute_value),
				coalesce(pav.attribute_value_view, "pad".attribute_value_view)
			)::c_product_attribute as c_product_attribute
		from product_attribute_values as pav
		join product_attribute_types as pat on pat.product_attribute_type_id = pav.product_attribute_type_id
		join product_attribute_value_directory as "pad" on "pad".product_attribute_type_id = pav.product_attribute_type_id 
		where product_id in (select product_id from paginated_products )

	), variants as (
		select
			product_id,
			product_variant_id,
			row(product_variant_id,
				sku,
				create_url(image_preview),
				(select array_agg(create_url("unnest")) from unnest(images))
			)::c_product_variant as c_product_variant
		from product_variants
		where product_id in (select product_id from paginated_products )

	), prices as (
		select product_id, array_agg(row(product_characteristic_id, price, price_with_discount, discount)::c_product_price) as product_prices 
		from product_prices
		where product_id in (select product_id from paginated_products)
		group by product_id
	), characteristics as (
		select 
			pf.product_id,
			row(
				pf.product_characteristic_id,
				pf.product_variant_id,	
				array_agg(row(
							pfv.product_characteristic_type_id,
							pft.characteristic_name,
							pfd.characteristic_value,
							pfd.characteristic_value_view)::c_product_characteristic_value)	
			)::c_product_characteristic as c_product_characteristic
		from product_characteristics as pf
		join product_characteristic_values as pfv using(product_characteristic_id)
		join product_characteristic_types as pft on pft.product_characteristic_type_id = pfv.product_characteristic_type_id			
		join product_characteristic_value_directory as pfd on pfd.product_characteristic_value_directory_id = pfv.product_characteristic_value_directory_id
		where pf.product_id in (select product_id from paginated_products )
		group by pf.product_id, pf.product_characteristic_id,pf.product_variant_id

	), products as(
		select row(
			case when product_variant_id is not NULL 
			then paginated_products.product_variant_id
			else (select product_variant_id from variants where variants.product_id = products.product_id  limit 1)
			end,
			product_id,
			product_name,
			rating,
			description,
			product_prices,
			array(
				select c_product_attribute from attrs
				 where product_id = products.product_id),
			array(
				select c_product_characteristic from characteristics
				 where product_id = products.product_id),
			array(
				select c_product_variant from variants
				 where product_id = products.product_id)
				)::c_product as single_item
		from products
		join paginated_products using(product_id)
		join prices using(product_id)
		order by ordinality
	)	
	select array(select single_item from products) $$ into v_res;
	return coalesce(v_res, array[]::c_product[]);
end; 
$_$;
 ^   DROP FUNCTION public.get_products(p_ids public.c_product_id_variant_id[], p_pagination json);
       public          postgres    false    740    716                       1255    33270 D   get_ranked_products(public.c_product_id_variant_id[], integer, text)    FUNCTION     >  CREATE FUNCTION public.get_ranked_products(p_products public.c_product_id_variant_id[], p_sort integer, p_text_search text) RETURNS public.c_product_id_variant_id[]
    LANGUAGE plpgsql
    AS $_$
declare 
	v_res c_product_id_variant_id[];
begin

	execute $$
	with p_products as (
		select * from unnest($$|| quote_literal(p_products) ||$$ ::c_product_id_variant_id[] )
	), buffer as (
		select 
			row(p_products.product_id, p_products.product_variant_id)::c_product_id_variant_id as single_item,
			price_with_discount, 
			$$||case when p_text_search is null 
					then '0'
					else 'ts_rank(tsv,plainto_tsquery('|| quote_literal(p_text_search) ||'))'
				end 
			||$$ as tsrank
		from p_products
		join product_variants using(product_variant_id)	
		left join product_characteristics pc using (product_variant_id)
		join product_prices pp on pp.product_id = p_products.product_id and pp.product_characteristic_id = pc.product_characteristic_id 
		group by p_products.product_id, p_products.product_variant_id, price_with_discount, tsv
		order by $$|| 
				case when p_sort = 1 then 
					'price_with_discount asc,'
				when p_sort = 2 then
					'price_with_discount desc,'
				end 
		||$$ tsrank desc
	) 
	select array_agg(single_item) from buffer $$
	into v_res;
	
	return coalesce(v_res, array[]::c_product_id_variant_id[]);
end; 
$_$;
 {   DROP FUNCTION public.get_ranked_products(p_products public.c_product_id_variant_id[], p_sort integer, p_text_search text);
       public          postgres    false    740    740                        1255    33271    get_user_by_email(text)    FUNCTION     �   CREATE FUNCTION public.get_user_by_email(p_email text) RETURNS public.c_user
    LANGUAGE plpgsql
    AS $$
begin
	return row(user_id, first_name, last_name, email, "password", password_updated_at)::c_user
	from users 
	where email = p_email;
end;
$$;
 6   DROP FUNCTION public.get_user_by_email(p_email text);
       public          postgres    false    743                       1255    33272    get_user_by_id(integer)    FUNCTION       CREATE FUNCTION public.get_user_by_id(p_user_id integer) RETURNS public.c_user
    LANGUAGE plpgsql
    AS $$
begin
	
	return row(user_id, first_name, last_name, email, "password", password_updated_at)::c_user
	from users 
	where user_id = p_user_id;
end;
$$;
 8   DROP FUNCTION public.get_user_by_id(p_user_id integer);
       public          postgres    false    743                       1255    33273    get_user_cart(integer)    FUNCTION     �  CREATE FUNCTION public.get_user_cart(p_user_id integer) RETURNS public.c_cart_product[]
    LANGUAGE plpgsql
    AS $$
begin
	return get_cart_products(
			array_to_json(
				(select array_agg(json_build_object('product_id',product_id, 
												  'product_characteristic_id', product_characteristic_id, 
												  'quantity',quantity))
			   from user_cart
			   where user_id = p_user_id)
			)
	);
end;
$$;
 7   DROP FUNCTION public.get_user_cart(p_user_id integer);
       public          postgres    false    613            
           1255    33274    get_user_cart_fav_ids(integer)    FUNCTION     '  CREATE FUNCTION public.get_user_cart_fav_ids(p_user_id integer) RETURNS public.c_user_cart_fav_ids
    LANGUAGE plpgsql
    AS $$
begin
	return row(
		coalesce(
			(select array_agg(row(product_id, product_characteristic_id)::c_user_cart_fav_id) 
			from user_cart
			where user_id = p_user_id)
		,array[]::c_user_cart_fav_id[])
		,
		coalesce(
			(select array_agg(row(product_id, product_characteristic_id)::c_user_cart_fav_id)
			from user_favorites
			where user_id = p_user_id)
		,array[]::c_user_cart_fav_id[])
	)::c_user_cart_fav_ids;
end;
$$;
 ?   DROP FUNCTION public.get_user_cart_fav_ids(p_user_id integer);
       public          postgres    false    749                       1255    33275    get_user_favorites(integer)    FUNCTION     �  CREATE FUNCTION public.get_user_favorites(p_user_id integer) RETURNS public.c_favorites_product[]
    LANGUAGE plpgsql
    AS $$
begin
	return get_favorites_products(
			array_to_json(
				(select array_agg(json_build_object('product_id',product_id, 
												  'product_characteristic_id', product_characteristic_id))
			   from user_favorites
			   where user_id = p_user_id)
			)
	);
end;
$$;
 <   DROP FUNCTION public.get_user_favorites(p_user_id integer);
       public          postgres    false    701            �            1259    33276    product_attribute_types    TABLE     �   CREATE TABLE public.product_attribute_types (
    product_attribute_type_id integer NOT NULL,
    attribute_name text NOT NULL
);
 +   DROP TABLE public.product_attribute_types;
       public         heap    postgres    false            �            1259    33282 5   product_attribute_types_product_attribute_type_id_seq    SEQUENCE       ALTER TABLE public.product_attribute_types ALTER COLUMN product_attribute_type_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.product_attribute_types_product_attribute_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    221            �            1259    33284 !   product_attribute_value_directory    TABLE     �   CREATE TABLE public.product_attribute_value_directory (
    product_attribute_value_directory_id integer NOT NULL,
    product_attribute_type_id integer,
    attribute_value jsonb NOT NULL,
    attribute_value_view jsonb NOT NULL
);
 5   DROP TABLE public.product_attribute_value_directory;
       public         heap    postgres    false            �            1259    33290 ?   product_attribute_value_direc_product_attribute_value_direc_seq    SEQUENCE     :  ALTER TABLE public.product_attribute_value_directory ALTER COLUMN product_attribute_value_directory_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.product_attribute_value_direc_product_attribute_value_direc_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    223            �            1259    33292    product_attribute_values    TABLE       CREATE TABLE public.product_attribute_values (
    product_attribute_value_id integer NOT NULL,
    product_id integer,
    product_attribute_type_id integer,
    attribute_value jsonb,
    attribute_value_view jsonb,
    product_attribute_value_directory_id integer
);
 ,   DROP TABLE public.product_attribute_values;
       public         heap    postgres    false            �            1259    33298 7   product_attribute_values_product_attribute_value_id_seq    SEQUENCE       ALTER TABLE public.product_attribute_values ALTER COLUMN product_attribute_value_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.product_attribute_values_product_attribute_value_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    225            �            1259    33300    product_categories    TABLE     �   CREATE TABLE public.product_categories (
    product_category_id integer NOT NULL,
    category_name text NOT NULL,
    parent_category integer,
    product_type_id integer
);
 &   DROP TABLE public.product_categories;
       public         heap    postgres    false            �            1259    33306 *   product_categories_product_category_id_seq    SEQUENCE       ALTER TABLE public.product_categories ALTER COLUMN product_category_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.product_categories_product_category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    227            �            1259    33308    product_characteristic_types    TABLE     �   CREATE TABLE public.product_characteristic_types (
    product_characteristic_type_id text NOT NULL,
    characteristic_name text NOT NULL,
    variant_defining boolean
);
 0   DROP TABLE public.product_characteristic_types;
       public         heap    postgres    false            �            1259    33314 &   product_characteristic_value_directory    TABLE     �   CREATE TABLE public.product_characteristic_value_directory (
    product_characteristic_value_directory_id integer NOT NULL,
    product_characteristic_type_id text,
    characteristic_value jsonb NOT NULL,
    characteristic_value_view jsonb NOT NULL
);
 :   DROP TABLE public.product_characteristic_value_directory;
       public         heap    postgres    false            �            1259    33320 ?   product_characteristic_value__product_characteristic_value__seq    SEQUENCE     D  ALTER TABLE public.product_characteristic_value_directory ALTER COLUMN product_characteristic_value_directory_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.product_characteristic_value__product_characteristic_value__seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    230            �            1259    33322    product_characteristic_values    TABLE     �   CREATE TABLE public.product_characteristic_values (
    product_characteristic_value_id integer NOT NULL,
    product_characteristic_type_id text,
    product_characteristic_id integer,
    product_characteristic_value_directory_id integer
);
 1   DROP TABLE public.product_characteristic_values;
       public         heap    postgres    false            �            1259    33328 ?   product_characteristic_values_product_characteristic_value__seq    SEQUENCE     1  ALTER TABLE public.product_characteristic_values ALTER COLUMN product_characteristic_value_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.product_characteristic_values_product_characteristic_value__seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    232            �            1259    33330    product_characteristics    TABLE     �   CREATE TABLE public.product_characteristics (
    product_characteristic_id integer NOT NULL,
    product_id integer,
    product_variant_id integer
);
 +   DROP TABLE public.product_characteristics;
       public         heap    postgres    false            �            1259    33333 5   product_characteristics_product_characteristic_id_seq    SEQUENCE       ALTER TABLE public.product_characteristics ALTER COLUMN product_characteristic_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.product_characteristics_product_characteristic_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    234            �            1259    33335    product_prices    TABLE     �   CREATE TABLE public.product_prices (
    product_price_id integer NOT NULL,
    product_id integer NOT NULL,
    product_characteristic_id integer,
    price numeric NOT NULL,
    price_with_discount numeric NOT NULL,
    discount smallint
);
 "   DROP TABLE public.product_prices;
       public         heap    postgres    false            �            1259    33341 #   product_prices_product_price_id_seq    SEQUENCE     �   ALTER TABLE public.product_prices ALTER COLUMN product_price_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.product_prices_product_price_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    236            �            1259    33343    product_tag_relations    TABLE     �   CREATE TABLE public.product_tag_relations (
    product_tag_relation_id integer NOT NULL,
    product_tag_id integer,
    product_attribute_value_id integer,
    product_characteristic_value_id integer
);
 )   DROP TABLE public.product_tag_relations;
       public         heap    postgres    false            �            1259    33346 1   product_tag_relations_product_tag_relation_id_seq    SEQUENCE       ALTER TABLE public.product_tag_relations ALTER COLUMN product_tag_relation_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.product_tag_relations_product_tag_relation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    238            �            1259    33348    product_tag_types    TABLE     �   CREATE TABLE public.product_tag_types (
    product_tag_type_id text NOT NULL,
    product_tag_type_name text NOT NULL,
    defining_variant boolean
);
 %   DROP TABLE public.product_tag_types;
       public         heap    postgres    false            �            1259    33354    product_tags    TABLE     �   CREATE TABLE public.product_tags (
    product_tag_id integer NOT NULL,
    product_tag_type_id text,
    product_variant_id integer,
    product_id integer,
    product_tag text NOT NULL,
    product_tag_view jsonb NOT NULL
);
     DROP TABLE public.product_tags;
       public         heap    postgres    false            �            1259    33360    product_tags_product_tag_id_seq    SEQUENCE     �   ALTER TABLE public.product_tags ALTER COLUMN product_tag_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.product_tags_product_tag_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    241            �            1259    33362    product_type_attributes    TABLE     �   CREATE TABLE public.product_type_attributes (
    product_type_attribute_id integer NOT NULL,
    product_type_id integer,
    product_attribute_type_id integer
);
 +   DROP TABLE public.product_type_attributes;
       public         heap    postgres    false            �            1259    33365 5   product_type_attributes_product_type_attribute_id_seq    SEQUENCE       ALTER TABLE public.product_type_attributes ALTER COLUMN product_type_attribute_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.product_type_attributes_product_type_attribute_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    243            �            1259    33367    product_type_characteristics    TABLE     �   CREATE TABLE public.product_type_characteristics (
    product_type_characteristic_id integer NOT NULL,
    product_type_id integer,
    product_characteristic_type_id text
);
 0   DROP TABLE public.product_type_characteristics;
       public         heap    postgres    false            �            1259    33373 ?   product_type_characteristics_product_type_characteristic_id_seq    SEQUENCE     /  ALTER TABLE public.product_type_characteristics ALTER COLUMN product_type_characteristic_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.product_type_characteristics_product_type_characteristic_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    245            �            1259    33375    product_types    TABLE     q   CREATE TABLE public.product_types (
    product_type_id integer NOT NULL,
    product_type_name text NOT NULL
);
 !   DROP TABLE public.product_types;
       public         heap    postgres    false            �            1259    33381 !   product_types_product_type_id_seq    SEQUENCE     �   ALTER TABLE public.product_types ALTER COLUMN product_type_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.product_types_product_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    247            �            1259    33383    product_variants    TABLE     �   CREATE TABLE public.product_variants (
    product_variant_id integer NOT NULL,
    product_id integer,
    sku integer NOT NULL,
    image_preview text,
    images text[],
    tsv tsvector
);
 $   DROP TABLE public.product_variants;
       public         heap    postgres    false            �            1259    33389 '   product_variants_product_variant_id_seq    SEQUENCE     �   ALTER TABLE public.product_variants ALTER COLUMN product_variant_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.product_variants_product_variant_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    249            �            1259    33391    product_variants_sku_seq    SEQUENCE     �   ALTER TABLE public.product_variants ALTER COLUMN sku ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.product_variants_sku_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    249            �            1259    33393    products    TABLE     �   CREATE TABLE public.products (
    product_id integer NOT NULL,
    product_name text NOT NULL,
    product_type_id integer,
    description text DEFAULT ''::text NOT NULL,
    rating integer NOT NULL
);
    DROP TABLE public.products;
       public         heap    postgres    false            �            1259    33400    products_product_id_seq    SEQUENCE     �   ALTER TABLE public.products ALTER COLUMN product_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.products_product_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    252            �            1259    33402    products_sort    TABLE     i   CREATE TABLE public.products_sort (
    product_sort_id integer NOT NULL,
    sort_name text NOT NULL
);
 !   DROP TABLE public.products_sort;
       public         heap    postgres    false            �            1259    33408 !   products_sort_product_sort_id_seq    SEQUENCE     �   ALTER TABLE public.products_sort ALTER COLUMN product_sort_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.products_sort_product_sort_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    254                        1259    33410 	   user_cart    TABLE     �   CREATE TABLE public.user_cart (
    user_cart_item_id integer NOT NULL,
    user_id integer,
    product_id integer,
    product_characteristic_id integer,
    quantity integer
);
    DROP TABLE public.user_cart;
       public         heap    postgres    false                       1259    33413    user_cart_user_cart_item_id_seq    SEQUENCE     �   ALTER TABLE public.user_cart ALTER COLUMN user_cart_item_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.user_cart_user_cart_item_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    256                       1259    33415    user_favorites    TABLE     �   CREATE TABLE public.user_favorites (
    user_favorites_item_id integer NOT NULL,
    user_id integer,
    product_id integer,
    product_characteristic_id integer
);
 "   DROP TABLE public.user_favorites;
       public         heap    postgres    false                       1259    33418 )   user_favorites_user_favorites_item_id_seq    SEQUENCE       ALTER TABLE public.user_favorites ALTER COLUMN user_favorites_item_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.user_favorites_user_favorites_item_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    258                       1259    33420    users    TABLE     �   CREATE TABLE public.users (
    user_id integer NOT NULL,
    first_name text,
    last_name text,
    email text,
    password text,
    password_updated_at timestamp without time zone
);
    DROP TABLE public.users;
       public         heap    postgres    false                       1259    33426    users_user_id_seq    SEQUENCE     �   ALTER TABLE public.users ALTER COLUMN user_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    260            ]          0    33276    product_attribute_types 
   TABLE DATA           \   COPY public.product_attribute_types (product_attribute_type_id, attribute_name) FROM stdin;
    public          postgres    false    221   )k      _          0    33284 !   product_attribute_value_directory 
   TABLE DATA           �   COPY public.product_attribute_value_directory (product_attribute_value_directory_id, product_attribute_type_id, attribute_value, attribute_value_view) FROM stdin;
    public          postgres    false    223   vk      a          0    33292    product_attribute_values 
   TABLE DATA           �   COPY public.product_attribute_values (product_attribute_value_id, product_id, product_attribute_type_id, attribute_value, attribute_value_view, product_attribute_value_directory_id) FROM stdin;
    public          postgres    false    225   �k      c          0    33300    product_categories 
   TABLE DATA           r   COPY public.product_categories (product_category_id, category_name, parent_category, product_type_id) FROM stdin;
    public          postgres    false    227   �m      e          0    33308    product_characteristic_types 
   TABLE DATA           }   COPY public.product_characteristic_types (product_characteristic_type_id, characteristic_name, variant_defining) FROM stdin;
    public          postgres    false    229   On      f          0    33314 &   product_characteristic_value_directory 
   TABLE DATA           �   COPY public.product_characteristic_value_directory (product_characteristic_value_directory_id, product_characteristic_type_id, characteristic_value, characteristic_value_view) FROM stdin;
    public          postgres    false    230   �n      h          0    33322    product_characteristic_values 
   TABLE DATA           �   COPY public.product_characteristic_values (product_characteristic_value_id, product_characteristic_type_id, product_characteristic_id, product_characteristic_value_directory_id) FROM stdin;
    public          postgres    false    232   Fo      j          0    33330    product_characteristics 
   TABLE DATA           l   COPY public.product_characteristics (product_characteristic_id, product_id, product_variant_id) FROM stdin;
    public          postgres    false    234    q      l          0    33335    product_prices 
   TABLE DATA           �   COPY public.product_prices (product_price_id, product_id, product_characteristic_id, price, price_with_discount, discount) FROM stdin;
    public          postgres    false    236   �q      n          0    33343    product_tag_relations 
   TABLE DATA           �   COPY public.product_tag_relations (product_tag_relation_id, product_tag_id, product_attribute_value_id, product_characteristic_value_id) FROM stdin;
    public          postgres    false    238   s      p          0    33348    product_tag_types 
   TABLE DATA           i   COPY public.product_tag_types (product_tag_type_id, product_tag_type_name, defining_variant) FROM stdin;
    public          postgres    false    240   t      q          0    33354    product_tags 
   TABLE DATA           �   COPY public.product_tags (product_tag_id, product_tag_type_id, product_variant_id, product_id, product_tag, product_tag_view) FROM stdin;
    public          postgres    false    241   jt      s          0    33362    product_type_attributes 
   TABLE DATA           x   COPY public.product_type_attributes (product_type_attribute_id, product_type_id, product_attribute_type_id) FROM stdin;
    public          postgres    false    243   �v      u          0    33367    product_type_characteristics 
   TABLE DATA           �   COPY public.product_type_characteristics (product_type_characteristic_id, product_type_id, product_characteristic_type_id) FROM stdin;
    public          postgres    false    245   9w      w          0    33375    product_types 
   TABLE DATA           K   COPY public.product_types (product_type_id, product_type_name) FROM stdin;
    public          postgres    false    247   jw      y          0    33383    product_variants 
   TABLE DATA           k   COPY public.product_variants (product_variant_id, product_id, sku, image_preview, images, tsv) FROM stdin;
    public          postgres    false    249   �w      |          0    33393    products 
   TABLE DATA           b   COPY public.products (product_id, product_name, product_type_id, description, rating) FROM stdin;
    public          postgres    false    252   �z      ~          0    33402    products_sort 
   TABLE DATA           C   COPY public.products_sort (product_sort_id, sort_name) FROM stdin;
    public          postgres    false    254   <|      �          0    33410 	   user_cart 
   TABLE DATA           p   COPY public.user_cart (user_cart_item_id, user_id, product_id, product_characteristic_id, quantity) FROM stdin;
    public          postgres    false    256   o|      �          0    33415    user_favorites 
   TABLE DATA           p   COPY public.user_favorites (user_favorites_item_id, user_id, product_id, product_characteristic_id) FROM stdin;
    public          postgres    false    258   �|      �          0    33420    users 
   TABLE DATA           e   COPY public.users (user_id, first_name, last_name, email, password, password_updated_at) FROM stdin;
    public          postgres    false    260   �|      �           0    0 5   product_attribute_types_product_attribute_type_id_seq    SEQUENCE SET     d   SELECT pg_catalog.setval('public.product_attribute_types_product_attribute_type_id_seq', 1, false);
          public          postgres    false    222            �           0    0 ?   product_attribute_value_direc_product_attribute_value_direc_seq    SEQUENCE SET     n   SELECT pg_catalog.setval('public.product_attribute_value_direc_product_attribute_value_direc_seq', 1, false);
          public          postgres    false    224            �           0    0 7   product_attribute_values_product_attribute_value_id_seq    SEQUENCE SET     f   SELECT pg_catalog.setval('public.product_attribute_values_product_attribute_value_id_seq', 1, false);
          public          postgres    false    226            �           0    0 *   product_categories_product_category_id_seq    SEQUENCE SET     Y   SELECT pg_catalog.setval('public.product_categories_product_category_id_seq', 1, false);
          public          postgres    false    228            �           0    0 ?   product_characteristic_value__product_characteristic_value__seq    SEQUENCE SET     n   SELECT pg_catalog.setval('public.product_characteristic_value__product_characteristic_value__seq', 1, false);
          public          postgres    false    231            �           0    0 ?   product_characteristic_values_product_characteristic_value__seq    SEQUENCE SET     n   SELECT pg_catalog.setval('public.product_characteristic_values_product_characteristic_value__seq', 1, false);
          public          postgres    false    233            �           0    0 5   product_characteristics_product_characteristic_id_seq    SEQUENCE SET     d   SELECT pg_catalog.setval('public.product_characteristics_product_characteristic_id_seq', 1, false);
          public          postgres    false    235            �           0    0 #   product_prices_product_price_id_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public.product_prices_product_price_id_seq', 1, false);
          public          postgres    false    237            �           0    0 1   product_tag_relations_product_tag_relation_id_seq    SEQUENCE SET     `   SELECT pg_catalog.setval('public.product_tag_relations_product_tag_relation_id_seq', 1, false);
          public          postgres    false    239            �           0    0    product_tags_product_tag_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.product_tags_product_tag_id_seq', 1, false);
          public          postgres    false    242            �           0    0 5   product_type_attributes_product_type_attribute_id_seq    SEQUENCE SET     d   SELECT pg_catalog.setval('public.product_type_attributes_product_type_attribute_id_seq', 1, false);
          public          postgres    false    244            �           0    0 ?   product_type_characteristics_product_type_characteristic_id_seq    SEQUENCE SET     n   SELECT pg_catalog.setval('public.product_type_characteristics_product_type_characteristic_id_seq', 1, false);
          public          postgres    false    246            �           0    0 !   product_types_product_type_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.product_types_product_type_id_seq', 1, false);
          public          postgres    false    248            �           0    0 '   product_variants_product_variant_id_seq    SEQUENCE SET     V   SELECT pg_catalog.setval('public.product_variants_product_variant_id_seq', 1, false);
          public          postgres    false    250            �           0    0    product_variants_sku_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.product_variants_sku_seq', 1, false);
          public          postgres    false    251            �           0    0    products_product_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.products_product_id_seq', 1, false);
          public          postgres    false    253            �           0    0 !   products_sort_product_sort_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.products_sort_product_sort_id_seq', 1, false);
          public          postgres    false    255            �           0    0    user_cart_user_cart_item_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.user_cart_user_cart_item_id_seq', 536, true);
          public          postgres    false    257            �           0    0 )   user_favorites_user_favorites_item_id_seq    SEQUENCE SET     X   SELECT pg_catalog.setval('public.user_favorites_user_favorites_item_id_seq', 17, true);
          public          postgres    false    259            �           0    0    users_user_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.users_user_id_seq', 2, true);
          public          postgres    false    261            �           2606    33429 4   product_attribute_types product_attribute_types_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.product_attribute_types
    ADD CONSTRAINT product_attribute_types_pkey PRIMARY KEY (product_attribute_type_id);
 ^   ALTER TABLE ONLY public.product_attribute_types DROP CONSTRAINT product_attribute_types_pkey;
       public            postgres    false    221            �           2606    33431 H   product_attribute_value_directory product_attribute_value_directory_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.product_attribute_value_directory
    ADD CONSTRAINT product_attribute_value_directory_pkey PRIMARY KEY (product_attribute_value_directory_id);
 r   ALTER TABLE ONLY public.product_attribute_value_directory DROP CONSTRAINT product_attribute_value_directory_pkey;
       public            postgres    false    223            �           2606    33433 6   product_attribute_values product_attribute_values_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.product_attribute_values
    ADD CONSTRAINT product_attribute_values_pkey PRIMARY KEY (product_attribute_value_id);
 `   ALTER TABLE ONLY public.product_attribute_values DROP CONSTRAINT product_attribute_values_pkey;
       public            postgres    false    225            �           2606    33435 *   product_categories product_categories_pkey 
   CONSTRAINT     y   ALTER TABLE ONLY public.product_categories
    ADD CONSTRAINT product_categories_pkey PRIMARY KEY (product_category_id);
 T   ALTER TABLE ONLY public.product_categories DROP CONSTRAINT product_categories_pkey;
       public            postgres    false    227            �           2606    33437 >   product_characteristic_types product_characteristic_types_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.product_characteristic_types
    ADD CONSTRAINT product_characteristic_types_pkey PRIMARY KEY (product_characteristic_type_id);
 h   ALTER TABLE ONLY public.product_characteristic_types DROP CONSTRAINT product_characteristic_types_pkey;
       public            postgres    false    229            �           2606    33439 R   product_characteristic_value_directory product_characteristic_value_directory_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.product_characteristic_value_directory
    ADD CONSTRAINT product_characteristic_value_directory_pkey PRIMARY KEY (product_characteristic_value_directory_id);
 |   ALTER TABLE ONLY public.product_characteristic_value_directory DROP CONSTRAINT product_characteristic_value_directory_pkey;
       public            postgres    false    230            �           2606    33441 @   product_characteristic_values product_characteristic_values_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.product_characteristic_values
    ADD CONSTRAINT product_characteristic_values_pkey PRIMARY KEY (product_characteristic_value_id);
 j   ALTER TABLE ONLY public.product_characteristic_values DROP CONSTRAINT product_characteristic_values_pkey;
       public            postgres    false    232            �           2606    33443 4   product_characteristics product_characteristics_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.product_characteristics
    ADD CONSTRAINT product_characteristics_pkey PRIMARY KEY (product_characteristic_id);
 ^   ALTER TABLE ONLY public.product_characteristics DROP CONSTRAINT product_characteristics_pkey;
       public            postgres    false    234            �           2606    33445 "   product_prices product_prices_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.product_prices
    ADD CONSTRAINT product_prices_pkey PRIMARY KEY (product_price_id);
 L   ALTER TABLE ONLY public.product_prices DROP CONSTRAINT product_prices_pkey;
       public            postgres    false    236            �           2606    33447 0   product_tag_relations product_tag_relations_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.product_tag_relations
    ADD CONSTRAINT product_tag_relations_pkey PRIMARY KEY (product_tag_relation_id);
 Z   ALTER TABLE ONLY public.product_tag_relations DROP CONSTRAINT product_tag_relations_pkey;
       public            postgres    false    238            �           2606    33449 (   product_tag_types product_tag_types_pkey 
   CONSTRAINT     w   ALTER TABLE ONLY public.product_tag_types
    ADD CONSTRAINT product_tag_types_pkey PRIMARY KEY (product_tag_type_id);
 R   ALTER TABLE ONLY public.product_tag_types DROP CONSTRAINT product_tag_types_pkey;
       public            postgres    false    240            �           2606    33451    product_tags product_tags_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.product_tags
    ADD CONSTRAINT product_tags_pkey PRIMARY KEY (product_tag_id);
 H   ALTER TABLE ONLY public.product_tags DROP CONSTRAINT product_tags_pkey;
       public            postgres    false    241            �           2606    33453 4   product_type_attributes product_type_attributes_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.product_type_attributes
    ADD CONSTRAINT product_type_attributes_pkey PRIMARY KEY (product_type_attribute_id);
 ^   ALTER TABLE ONLY public.product_type_attributes DROP CONSTRAINT product_type_attributes_pkey;
       public            postgres    false    243            �           2606    33455 >   product_type_characteristics product_type_characteristics_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.product_type_characteristics
    ADD CONSTRAINT product_type_characteristics_pkey PRIMARY KEY (product_type_characteristic_id);
 h   ALTER TABLE ONLY public.product_type_characteristics DROP CONSTRAINT product_type_characteristics_pkey;
       public            postgres    false    245            �           2606    33457     product_types product_types_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public.product_types
    ADD CONSTRAINT product_types_pkey PRIMARY KEY (product_type_id);
 J   ALTER TABLE ONLY public.product_types DROP CONSTRAINT product_types_pkey;
       public            postgres    false    247            �           2606    33459 &   product_variants product_variants_pkey 
   CONSTRAINT     t   ALTER TABLE ONLY public.product_variants
    ADD CONSTRAINT product_variants_pkey PRIMARY KEY (product_variant_id);
 P   ALTER TABLE ONLY public.product_variants DROP CONSTRAINT product_variants_pkey;
       public            postgres    false    249            �           2606    33461    products products_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (product_id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    252            �           2606    33463     products_sort products_sort_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public.products_sort
    ADD CONSTRAINT products_sort_pkey PRIMARY KEY (product_sort_id);
 J   ALTER TABLE ONLY public.products_sort DROP CONSTRAINT products_sort_pkey;
       public            postgres    false    254            �           2606    33465    user_cart user_cart_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public.user_cart
    ADD CONSTRAINT user_cart_pkey PRIMARY KEY (user_cart_item_id);
 B   ALTER TABLE ONLY public.user_cart DROP CONSTRAINT user_cart_pkey;
       public            postgres    false    256            �           2606    33467 D   user_cart user_cart_user_id_product_id_product_characteristic_id_key 
   CONSTRAINT     �   ALTER TABLE ONLY public.user_cart
    ADD CONSTRAINT user_cart_user_id_product_id_product_characteristic_id_key UNIQUE (user_id, product_id, product_characteristic_id);
 n   ALTER TABLE ONLY public.user_cart DROP CONSTRAINT user_cart_user_id_product_id_product_characteristic_id_key;
       public            postgres    false    256    256    256            �           2606    33469 "   user_favorites user_favorites_pkey 
   CONSTRAINT     t   ALTER TABLE ONLY public.user_favorites
    ADD CONSTRAINT user_favorites_pkey PRIMARY KEY (user_favorites_item_id);
 L   ALTER TABLE ONLY public.user_favorites DROP CONSTRAINT user_favorites_pkey;
       public            postgres    false    258            �           2606    33471 N   user_favorites user_favorites_user_id_product_id_product_characteristic_id_key 
   CONSTRAINT     �   ALTER TABLE ONLY public.user_favorites
    ADD CONSTRAINT user_favorites_user_id_product_id_product_characteristic_id_key UNIQUE (user_id, product_id, product_characteristic_id);
 x   ALTER TABLE ONLY public.user_favorites DROP CONSTRAINT user_favorites_user_id_product_id_product_characteristic_id_key;
       public            postgres    false    258    258    258            �           2606    33473    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    260            �           2606    33474 a   product_attribute_value_directory product_attribute_value_director_product_attribute_type_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_attribute_value_directory
    ADD CONSTRAINT product_attribute_value_director_product_attribute_type_id_fkey FOREIGN KEY (product_attribute_type_id) REFERENCES public.product_attribute_types(product_attribute_type_id);
 �   ALTER TABLE ONLY public.product_attribute_value_directory DROP CONSTRAINT product_attribute_value_director_product_attribute_type_id_fkey;
       public          postgres    false    221    2962    223            �           2606    33479 P   product_attribute_values product_attribute_values_product_attribute_type_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_attribute_values
    ADD CONSTRAINT product_attribute_values_product_attribute_type_id_fkey FOREIGN KEY (product_attribute_type_id) REFERENCES public.product_attribute_types(product_attribute_type_id);
 z   ALTER TABLE ONLY public.product_attribute_values DROP CONSTRAINT product_attribute_values_product_attribute_type_id_fkey;
       public          postgres    false    225    2962    221            �           2606    33484 X   product_attribute_values product_attribute_values_product_attribute_value_directory_fkey    FK CONSTRAINT       ALTER TABLE ONLY public.product_attribute_values
    ADD CONSTRAINT product_attribute_values_product_attribute_value_directory_fkey FOREIGN KEY (product_attribute_value_directory_id) REFERENCES public.product_attribute_value_directory(product_attribute_value_directory_id);
 �   ALTER TABLE ONLY public.product_attribute_values DROP CONSTRAINT product_attribute_values_product_attribute_value_directory_fkey;
       public          postgres    false    225    2964    223            �           2606    33489 A   product_attribute_values product_attribute_values_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_attribute_values
    ADD CONSTRAINT product_attribute_values_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(product_id);
 k   ALTER TABLE ONLY public.product_attribute_values DROP CONSTRAINT product_attribute_values_product_id_fkey;
       public          postgres    false    252    2994    225            �           2606    33494 :   product_categories product_categories_parent_category_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_categories
    ADD CONSTRAINT product_categories_parent_category_fkey FOREIGN KEY (parent_category) REFERENCES public.product_categories(product_category_id);
 d   ALTER TABLE ONLY public.product_categories DROP CONSTRAINT product_categories_parent_category_fkey;
       public          postgres    false    227    227    2968            �           2606    33499 :   product_categories product_categories_product_type_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_categories
    ADD CONSTRAINT product_categories_product_type_id_fkey FOREIGN KEY (product_type_id) REFERENCES public.product_types(product_type_id);
 d   ALTER TABLE ONLY public.product_categories DROP CONSTRAINT product_categories_product_type_id_fkey;
       public          postgres    false    247    2990    227            �           2606    33504 f   product_characteristic_value_directory product_characteristic_value__product_characteristic_type__fkey    FK CONSTRAINT       ALTER TABLE ONLY public.product_characteristic_value_directory
    ADD CONSTRAINT product_characteristic_value__product_characteristic_type__fkey FOREIGN KEY (product_characteristic_type_id) REFERENCES public.product_characteristic_types(product_characteristic_type_id);
 �   ALTER TABLE ONLY public.product_characteristic_value_directory DROP CONSTRAINT product_characteristic_value__product_characteristic_type__fkey;
       public          postgres    false    229    230    2970            �           2606    33509 Z   product_characteristic_values product_characteristic_values_product_characteristic_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_characteristic_values
    ADD CONSTRAINT product_characteristic_values_product_characteristic_id_fkey FOREIGN KEY (product_characteristic_id) REFERENCES public.product_characteristics(product_characteristic_id);
 �   ALTER TABLE ONLY public.product_characteristic_values DROP CONSTRAINT product_characteristic_values_product_characteristic_id_fkey;
       public          postgres    false    234    232    2976            �           2606    33514 ]   product_characteristic_values product_characteristic_values_product_characteristic_type__fkey    FK CONSTRAINT       ALTER TABLE ONLY public.product_characteristic_values
    ADD CONSTRAINT product_characteristic_values_product_characteristic_type__fkey FOREIGN KEY (product_characteristic_type_id) REFERENCES public.product_characteristic_types(product_characteristic_type_id);
 �   ALTER TABLE ONLY public.product_characteristic_values DROP CONSTRAINT product_characteristic_values_product_characteristic_type__fkey;
       public          postgres    false    229    232    2970            �           2606    33519 ]   product_characteristic_values product_characteristic_values_product_characteristic_value_fkey    FK CONSTRAINT     &  ALTER TABLE ONLY public.product_characteristic_values
    ADD CONSTRAINT product_characteristic_values_product_characteristic_value_fkey FOREIGN KEY (product_characteristic_value_directory_id) REFERENCES public.product_characteristic_value_directory(product_characteristic_value_directory_id);
 �   ALTER TABLE ONLY public.product_characteristic_values DROP CONSTRAINT product_characteristic_values_product_characteristic_value_fkey;
       public          postgres    false    232    2972    230            �           2606    33524 ?   product_characteristics product_characteristics_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_characteristics
    ADD CONSTRAINT product_characteristics_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(product_id);
 i   ALTER TABLE ONLY public.product_characteristics DROP CONSTRAINT product_characteristics_product_id_fkey;
       public          postgres    false    252    234    2994            �           2606    33529 G   product_characteristics product_characteristics_product_variant_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_characteristics
    ADD CONSTRAINT product_characteristics_product_variant_id_fkey FOREIGN KEY (product_variant_id) REFERENCES public.product_variants(product_variant_id);
 q   ALTER TABLE ONLY public.product_characteristics DROP CONSTRAINT product_characteristics_product_variant_id_fkey;
       public          postgres    false    2992    234    249            �           2606    33534 <   product_prices product_prices_product_characteristic_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_prices
    ADD CONSTRAINT product_prices_product_characteristic_id_fkey FOREIGN KEY (product_characteristic_id) REFERENCES public.product_characteristics(product_characteristic_id);
 f   ALTER TABLE ONLY public.product_prices DROP CONSTRAINT product_prices_product_characteristic_id_fkey;
       public          postgres    false    2976    234    236            �           2606    33539 -   product_prices product_prices_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_prices
    ADD CONSTRAINT product_prices_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(product_id);
 W   ALTER TABLE ONLY public.product_prices DROP CONSTRAINT product_prices_product_id_fkey;
       public          postgres    false    236    252    2994            �           2606    33544 K   product_tag_relations product_tag_relations_product_attribute_value_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_tag_relations
    ADD CONSTRAINT product_tag_relations_product_attribute_value_id_fkey FOREIGN KEY (product_attribute_value_id) REFERENCES public.product_attribute_values(product_attribute_value_id);
 u   ALTER TABLE ONLY public.product_tag_relations DROP CONSTRAINT product_tag_relations_product_attribute_value_id_fkey;
       public          postgres    false    2966    238    225            �           2606    33549 P   product_tag_relations product_tag_relations_product_characteristic_value_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_tag_relations
    ADD CONSTRAINT product_tag_relations_product_characteristic_value_id_fkey FOREIGN KEY (product_characteristic_value_id) REFERENCES public.product_characteristic_values(product_characteristic_value_id);
 z   ALTER TABLE ONLY public.product_tag_relations DROP CONSTRAINT product_tag_relations_product_characteristic_value_id_fkey;
       public          postgres    false    232    238    2974            �           2606    33554 ?   product_tag_relations product_tag_relations_product_tag_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_tag_relations
    ADD CONSTRAINT product_tag_relations_product_tag_id_fkey FOREIGN KEY (product_tag_id) REFERENCES public.product_tags(product_tag_id);
 i   ALTER TABLE ONLY public.product_tag_relations DROP CONSTRAINT product_tag_relations_product_tag_id_fkey;
       public          postgres    false    241    238    2984            �           2606    33559 )   product_tags product_tags_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_tags
    ADD CONSTRAINT product_tags_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(product_id);
 S   ALTER TABLE ONLY public.product_tags DROP CONSTRAINT product_tags_product_id_fkey;
       public          postgres    false    241    252    2994            �           2606    33564 2   product_tags product_tags_product_tag_type_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_tags
    ADD CONSTRAINT product_tags_product_tag_type_id_fkey FOREIGN KEY (product_tag_type_id) REFERENCES public.product_tag_types(product_tag_type_id);
 \   ALTER TABLE ONLY public.product_tags DROP CONSTRAINT product_tags_product_tag_type_id_fkey;
       public          postgres    false    241    240    2982            �           2606    33569 1   product_tags product_tags_product_variant_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_tags
    ADD CONSTRAINT product_tags_product_variant_id_fkey FOREIGN KEY (product_variant_id) REFERENCES public.product_variants(product_variant_id);
 [   ALTER TABLE ONLY public.product_tags DROP CONSTRAINT product_tags_product_variant_id_fkey;
       public          postgres    false    2992    241    249            �           2606    33574 N   product_type_attributes product_type_attributes_product_attribute_type_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_type_attributes
    ADD CONSTRAINT product_type_attributes_product_attribute_type_id_fkey FOREIGN KEY (product_attribute_type_id) REFERENCES public.product_attribute_types(product_attribute_type_id);
 x   ALTER TABLE ONLY public.product_type_attributes DROP CONSTRAINT product_type_attributes_product_attribute_type_id_fkey;
       public          postgres    false    221    243    2962            �           2606    33579 D   product_type_attributes product_type_attributes_product_type_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_type_attributes
    ADD CONSTRAINT product_type_attributes_product_type_id_fkey FOREIGN KEY (product_type_id) REFERENCES public.product_types(product_type_id);
 n   ALTER TABLE ONLY public.product_type_attributes DROP CONSTRAINT product_type_attributes_product_type_id_fkey;
       public          postgres    false    243    247    2990            �           2606    33584 \   product_type_characteristics product_type_characteristics_product_characteristic_type_i_fkey    FK CONSTRAINT       ALTER TABLE ONLY public.product_type_characteristics
    ADD CONSTRAINT product_type_characteristics_product_characteristic_type_i_fkey FOREIGN KEY (product_characteristic_type_id) REFERENCES public.product_characteristic_types(product_characteristic_type_id);
 �   ALTER TABLE ONLY public.product_type_characteristics DROP CONSTRAINT product_type_characteristics_product_characteristic_type_i_fkey;
       public          postgres    false    245    2970    229            �           2606    33589 N   product_type_characteristics product_type_characteristics_product_type_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_type_characteristics
    ADD CONSTRAINT product_type_characteristics_product_type_id_fkey FOREIGN KEY (product_type_id) REFERENCES public.product_types(product_type_id);
 x   ALTER TABLE ONLY public.product_type_characteristics DROP CONSTRAINT product_type_characteristics_product_type_id_fkey;
       public          postgres    false    245    2990    247            �           2606    33594 1   product_variants product_variants_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_variants
    ADD CONSTRAINT product_variants_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(product_id);
 [   ALTER TABLE ONLY public.product_variants DROP CONSTRAINT product_variants_product_id_fkey;
       public          postgres    false    2994    252    249            �           2606    33599 &   products products_product_type_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_product_type_id_fkey FOREIGN KEY (product_type_id) REFERENCES public.product_types(product_type_id);
 P   ALTER TABLE ONLY public.products DROP CONSTRAINT products_product_type_id_fkey;
       public          postgres    false    252    2990    247            �           2606    33604 2   user_cart user_cart_product_characteristic_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_cart
    ADD CONSTRAINT user_cart_product_characteristic_id_fkey FOREIGN KEY (product_characteristic_id) REFERENCES public.product_characteristics(product_characteristic_id);
 \   ALTER TABLE ONLY public.user_cart DROP CONSTRAINT user_cart_product_characteristic_id_fkey;
       public          postgres    false    256    234    2976            �           2606    33609 #   user_cart user_cart_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_cart
    ADD CONSTRAINT user_cart_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(product_id);
 M   ALTER TABLE ONLY public.user_cart DROP CONSTRAINT user_cart_product_id_fkey;
       public          postgres    false    256    252    2994            �           2606    33614     user_cart user_cart_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_cart
    ADD CONSTRAINT user_cart_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);
 J   ALTER TABLE ONLY public.user_cart DROP CONSTRAINT user_cart_user_id_fkey;
       public          postgres    false    256    260    3006            �           2606    33619 <   user_favorites user_favorites_product_characteristic_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_favorites
    ADD CONSTRAINT user_favorites_product_characteristic_id_fkey FOREIGN KEY (product_characteristic_id) REFERENCES public.product_characteristics(product_characteristic_id);
 f   ALTER TABLE ONLY public.user_favorites DROP CONSTRAINT user_favorites_product_characteristic_id_fkey;
       public          postgres    false    2976    234    258            �           2606    33624 -   user_favorites user_favorites_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_favorites
    ADD CONSTRAINT user_favorites_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(product_id);
 W   ALTER TABLE ONLY public.user_favorites DROP CONSTRAINT user_favorites_product_id_fkey;
       public          postgres    false    2994    258    252            �           2606    33629 *   user_favorites user_favorites_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_favorites
    ADD CONSTRAINT user_favorites_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);
 T   ALTER TABLE ONLY public.user_favorites DROP CONSTRAINT user_favorites_user_id_fkey;
       public          postgres    false    260    258    3006            ]   =   x�3�t*J�K�2�.��I�2��M,I-�L��2�tN,J�2�t��-�/�,�������� ��=      _   r   x�3�4�TJ��/���KWH*J�KQ0T�V*I�(Q�R����2¢��#�cN#$=�%�9�8���r�`у��\-�)�1��s~II~�J�H-�H>8�$E"P����� �!SR      a   �  x�햿N�0�g�)N��@�Pb;�ڕ�uAL�!���&U�
����3�d���^Q(d ��,��ߝ��sv�&�dl��&#�%�DSL-$>�#�S<&>��S<E�ڏB�h�F<09�j4�J�}��K]!�/��Y�Κ��6��&/�7 �./��e���
��V����u�+�m=3�ʌ���Δ��B/t٬����f��x�,dǭ+�ОFǭ+�����[Wn1����f�^��������?ޯL�qy]��ftSAY5�^i��<ウs"4��`VoNp�f�1�Z3�$�7F[/�V�)b���� ڧ�M�8�}�M'��'��^���U�>�۱C�+r��ɻZ��<��d1UK���""^�EL��&ċj���Z�,"/h����%T�������T��֕[hO��֕[d[ǭ+�������	�F��W�)��^�+�C�'��5�����      c   e   x�3���M���".#N�����bNCט38#�1�tLNN-.�/ʄ	�rz�秀�F��\f��y% ��9�/�P��� �%�P0�� �T�X� /'�      e   !   x�3�άJ���2�t���/�,����� T�      f   �   x�U�O�@���Χ���k�VG�D]:t��h�I����sb����]F	%���==n=<���î��.�6vݏ5�:8��}%|�Y�&^n4�0S��<Ĺ������ns)�ky7N�����LKI��1�f�Qa�B�T��>����m����yd��MĀ���Y���I�8������ ���^      h   �  x���m�!�b��`^�\�ud���|�6�l�e[ћ�mFq��-�X�l�)v;q8��mG~Z}Vi�kj����ȍ���<�{j��? ��@�� �S
B%���廕�D��PIAvt!��dƐ�P�@��2�+ߒ>C
B%a�R*)ȍ!��2�������r�RNR2�}�{
�U2�IJF9I�(')�$%�Sb)e�*S��U�ğ� ���'��r�ML������Ƽ~���'+˿�v^��`MX�`LZ���ą������^z��K��}��o�S��
�KƖ`bb� ,�d���2�w�nOa�82LL���GF�qd��82��#��đaX��00qޒ����q�"����qe7ueWuewue���2�]]宮����{
!�I)'�O����S�uJI�R����5�u�JiF�si��=���4�����S�I      j   �   x�-й�D1DQ�
f��Q.�_8�:2
111�v�ջ���]C}�$����`yh�`{xS�x$)]p=n�rV{��:
�V�^��Xs4H�wt�Yy��J}OBm�����x��^��vV&���U�:%��b��`����ge*��˪c�m��������P9�      l   (  x�]�ۭ� ��P��4q+������h+�U��͸��k���&�	H�$$��Ŵ�'L�<Px,��'l�/�b�OF?��䆐�L�I��O����xa�E�Na^�e��"-�M�O��NbA�1#���\(H!�h���V���y�)i�EZB���3sC��5�Sc�}���C�>x_}�$���X�l^�R����hKmc��Ht��B��BF2!'�)���F�B(1ޑzO�Vj�&s�$s�$s�ȯ�x��ߌ4�H&�$
R%���GE�'}�Zk_씡s      n      x�5����0C�sP̎R���V���I�����"?�|�?�v�#�;k�B�(�;N\;.�;n���H'A?O��	&h�4��M���逬��F�5dM	Yӂ�� k:!k� k���@X"���w���Z$�Z,��(��8��BX�i-��$�Z
i-�]��Jdk}@6���b���jiu��j�o�S�\S��S�<��d��
�Y�p��Zq�j�CUS���`�G��4Z���jf�Z�h՚F����v      p   C   x�+άJ�1~\��9�E��`��+�(1/��	L%�K*s�J�$���X�Z�����c c���� ��s      q   {  x���͎�0���)P��*�^;]�tWU�v6<L�TLF���8�I �Kr����s1�xk����k����[v�ԕ��e[�[���x�T1#��T�"��D{%�+jf�Ԍ�D�rՠ�SΈ8��� ÜD��Ƅ��/WD��1!;'��3��C{8��b�֛���ŝ���1V~\����3�̼;�p'`c�Ի�P�C�_͞���q�V��|�X)��nK�-�ה���=��޺q;��~fF��
����� d�dvG��� 6F�)�ů��1�Xr��*0c[��y.q_C'�J;`Z�-���J��Wے�8*u[24�E%oK�b���㒡8_:gc�8c:yc�8c:��2���_ʁ��)?��� 8k&#G
��fR��BAp�L�Q�P�5�����5�����5�8b
kt���˭�i�K��-�ϖ��Sɳxst�[7a�Ϯ���Y��������C���<�Km�(��m�³U�(������V��EQ����:<�y4(33�"��j92(�d�U��23�:ZT��Ȣ����un�6ԹV#��N���E��x���Y����Mf���A��!�As/C�mn�&Z��ڑE{3çO���?�Ƨ�      s   4   x�ɷ� ����É��ρ�W�����hmF���
��6�y��;���      u   !   x�3�4�4�2�F\Ɯ@��Hq��qqq 4)o      w      x�3����O�L-�2�,H�+)����� S~C      y   9  x����r�@���)rǍ&Nπ�]|�����F,����}��uef����J!�!~���j����������{Y.��H���۷���c������b7dV���Z�3�U����t6T0{�k1�S{��o�q���ۦ���|�۷eU��8W��׍sx}�7qn�L���P�3��צ�C�����"@V�h�� {,X\ǣ�Ȓ���j�!�n����zZ�hx���f�AM�/�,'j�]�QZ큐xy�1�g6�a�X+����,��4�I��
.+���\�a�W�ӎ�)���P�@�G �#���^���Nv®�E�eak��iVr��������f��f���BI�$�T��+Iׂ^[�d�)ީϩE�j��Zt��ݪnv�S��������^�Q#5FF�~��Z��m���WR���p������������W����f�����{
HD�X��dD��F����5�{FV�H��#��64�M����B��H.4���B�����;�R�D#5F�7F#5Fsgc�.��HM0��s��ͷ���G��Epׁ$�������'��,i�RntD��+��oE�Z�i�J&WG�i���ݺG+�ވ
c�G`�2�#R4�<�]
�H'WP�T�a�mkJXf�C��i�K� Rxrɑ�]�pv���j�-A{�� �3��b�Sȩ���X>���$Gw���DL,` R����T,p���y@D�|A:��zlLruD��ɭ��Kl��z`b���C���F���s��n��Y4?�jhlI��'Fƶ�#�yF���<GQ���      |   J  x��MN�@���)|�(Ji�"X"N�f�q����cO��U�m��"R4y�{��4�*13}����!l�M��2��K �|��$`J6EF+(3G��8z�1��*
!������r^���ٴ��,C4�aB}�� C��Q�9}&��d¨�)
r�#l5H�L�l�:
��"Z8`��TY�d��j��Q�q�1bу�B��Pf5ch�x�~�]�$��'`�pq��!|���>+	�ǎ�j�uuM�_	/E����=����Q���]˻��P�n��Da�o��]���+��
x)�ۡ�]����7h��_�ku�;t�[[��7���>      ~   #   x�3���/O-.Q((�LN�2���L�@�c���� �
�      �   5   x�%�� 0�7�(�N���ք�)�C�
S>8l�9�^�vTݷ�H>UQ	q      �      x�34�4BC#�=... �      �   �   x��;NE1D���b�vb*V�
h�EH\Q��K�鬙s�m�v]���?��X�·1�֎ō �q����T���s��w̨5-	���CV5'��V�ʇh�* ֬��B
fn�h��k�`��4TJ�v��#"��u�����+�y=�'?w��������F�L,�uF�@`L��e��$�4��8�G�����C�.=�aKb�LmG+�=,xM��k���D(
y�g�a8�V걱T��4qX������x���g�     