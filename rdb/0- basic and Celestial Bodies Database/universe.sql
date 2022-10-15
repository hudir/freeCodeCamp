--
-- PostgreSQL database dump
--

-- Dumped from database version 12.9 (Ubuntu 12.9-2.pgdg20.04+1)
-- Dumped by pg_dump version 12.9 (Ubuntu 12.9-2.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE universe;
--
-- Name: universe; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE universe WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE universe OWNER TO freecodecamp;

\connect universe

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: city; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.city (
    city_id integer NOT NULL,
    name character varying(50) NOT NULL,
    master character varying(50) NOT NULL,
    country character varying(50) NOT NULL
);


ALTER TABLE public.city OWNER TO freecodecamp;

--
-- Name: city_city_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.city_city_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.city_city_id_seq OWNER TO freecodecamp;

--
-- Name: city_city_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.city_city_id_seq OWNED BY public.city.city_id;


--
-- Name: galaxy; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.galaxy (
    galaxy_id integer NOT NULL,
    name character varying(30),
    length numeric(8,1) NOT NULL,
    old integer NOT NULL,
    story text NOT NULL
);


ALTER TABLE public.galaxy OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.galaxy_galaxy_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.galaxy_galaxy_id_seq OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.galaxy_galaxy_id_seq OWNED BY public.galaxy.galaxy_id;


--
-- Name: moon; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.moon (
    moon_id integer NOT NULL,
    name character varying(30),
    planet_id integer NOT NULL,
    burn boolean NOT NULL,
    length integer NOT NULL
);


ALTER TABLE public.moon OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.moon_moon_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.moon_moon_id_seq OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.moon_moon_id_seq OWNED BY public.moon.moon_id;


--
-- Name: planet; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.planet (
    planet_id integer NOT NULL,
    name character varying(30),
    star_id integer NOT NULL,
    burn boolean NOT NULL,
    length integer NOT NULL
);


ALTER TABLE public.planet OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.planet_planet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.planet_planet_id_seq OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.planet_planet_id_seq OWNED BY public.planet.planet_id;


--
-- Name: star; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.star (
    star_id integer NOT NULL,
    name character varying(30),
    galaxy_id integer NOT NULL,
    age integer NOT NULL,
    length integer NOT NULL
);


ALTER TABLE public.star OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.star_star_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.star_star_id_seq OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.star_star_id_seq OWNED BY public.star.star_id;


--
-- Name: city city_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.city ALTER COLUMN city_id SET DEFAULT nextval('public.city_city_id_seq'::regclass);


--
-- Name: galaxy galaxy_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy ALTER COLUMN galaxy_id SET DEFAULT nextval('public.galaxy_galaxy_id_seq'::regclass);


--
-- Name: moon moon_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon ALTER COLUMN moon_id SET DEFAULT nextval('public.moon_moon_id_seq'::regclass);


--
-- Name: planet planet_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet ALTER COLUMN planet_id SET DEFAULT nextval('public.planet_planet_id_seq'::regclass);


--
-- Name: star star_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star ALTER COLUMN star_id SET DEFAULT nextval('public.star_star_id_seq'::regclass);


--
-- Data for Name: city; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.city VALUES (1, 'Berlin', 'unknow', 'De');
INSERT INTO public.city VALUES (5, 'Hamburg', 'unknown', 'Deu');
INSERT INTO public.city VALUES (6, 'Munic', 'unknown again', 'Deutschland');


--
-- Data for Name: galaxy; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.galaxy VALUES (3, 'Sun', 12.5, 949, 'An old Galaxy');
INSERT INTO public.galaxy VALUES (4, 'River', 23.5, 999, 'Very Long River Galaxy');
INSERT INTO public.galaxy VALUES (5, 'shawn', 42.3, 766, 'shawn galaxy');
INSERT INTO public.galaxy VALUES (6, 'fish', 87.2, 957, 'fish galaxy');
INSERT INTO public.galaxy VALUES (7, 'shui ping', 1.2, 642, 'new founded galaxy');
INSERT INTO public.galaxy VALUES (8, 'cow', 15.4, 632, 'big galaxy');


--
-- Data for Name: moon; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.moon VALUES (1, 'z1', 1, true, 12);
INSERT INTO public.moon VALUES (3, 'z1', 1, true, 121);
INSERT INTO public.moon VALUES (4, 'z2', 2, false, 222);
INSERT INTO public.moon VALUES (5, 'z3', 3, false, 4554);
INSERT INTO public.moon VALUES (6, 'z6', 4, false, 44798);
INSERT INTO public.moon VALUES (7, 'z1', 5, true, 1121);
INSERT INTO public.moon VALUES (8, 'z2', 6, false, 2422);
INSERT INTO public.moon VALUES (9, 'z3', 7, false, 45524);
INSERT INTO public.moon VALUES (10, 'z6', 8, false, 144798);
INSERT INTO public.moon VALUES (11, 'z21', 9, true, 31121);
INSERT INTO public.moon VALUES (12, 'z62', 10, false, 332422);
INSERT INTO public.moon VALUES (13, 'z3x', 11, false, 4345524);
INSERT INTO public.moon VALUES (14, 'zgg36', 12, false, 13444798);
INSERT INTO public.moon VALUES (15, 'z21', 9, true, 351121);
INSERT INTO public.moon VALUES (16, 'z62', 10, false, 3324224);
INSERT INTO public.moon VALUES (17, 'z3x', 11, false, 43345524);
INSERT INTO public.moon VALUES (18, 'zgg36', 12, false, 113444798);
INSERT INTO public.moon VALUES (19, 'z21', 9, true, 5351121);
INSERT INTO public.moon VALUES (20, 'z62', 10, false, 33242254);
INSERT INTO public.moon VALUES (21, 'z3x', 11, false, 453345524);
INSERT INTO public.moon VALUES (22, 'zgg36', 12, false, 1134447948);


--
-- Data for Name: planet; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.planet VALUES (1, 'x1', 1, false, 1);
INSERT INTO public.planet VALUES (2, 'x2', 1, false, 2);
INSERT INTO public.planet VALUES (3, 'x3', 2, false, 3);
INSERT INTO public.planet VALUES (4, 'x4', 2, true, 4);
INSERT INTO public.planet VALUES (5, 'x11', 3, false, 11);
INSERT INTO public.planet VALUES (6, 'x22', 1, false, 21);
INSERT INTO public.planet VALUES (7, 'x33', 3, false, 31);
INSERT INTO public.planet VALUES (8, 'x44', 3, true, 14);
INSERT INTO public.planet VALUES (9, 'x111', 5, false, 111);
INSERT INTO public.planet VALUES (10, 'x222', 5, false, 211);
INSERT INTO public.planet VALUES (11, 'x333', 6, false, 311);
INSERT INTO public.planet VALUES (12, 'x444', 6, true, 114);


--
-- Data for Name: star; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.star VALUES (1, 'earth', 3, 43, 66);
INSERT INTO public.star VALUES (2, 'water', 4, 56, 33);
INSERT INTO public.star VALUES (3, 'fire', 5, 66, 23);
INSERT INTO public.star VALUES (4, 'wind', 6, 32, 61);
INSERT INTO public.star VALUES (5, 'yin', 7, 423, 643);
INSERT INTO public.star VALUES (6, 'yang', 8, 435, 6783);


--
-- Name: city_city_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.city_city_id_seq', 6, true);


--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.galaxy_galaxy_id_seq', 8, true);


--
-- Name: moon_moon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.moon_moon_id_seq', 22, true);


--
-- Name: planet_planet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.planet_planet_id_seq', 12, true);


--
-- Name: star_star_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.star_star_id_seq', 6, true);


--
-- Name: city city_country_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.city
    ADD CONSTRAINT city_country_key UNIQUE (country);


--
-- Name: city city_master_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.city
    ADD CONSTRAINT city_master_key UNIQUE (master);


--
-- Name: city city_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.city
    ADD CONSTRAINT city_name_key UNIQUE (name);


--
-- Name: city city_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.city
    ADD CONSTRAINT city_pkey PRIMARY KEY (city_id);


--
-- Name: galaxy galaxy_length_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_length_key UNIQUE (length);


--
-- Name: galaxy galaxy_old_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_old_key UNIQUE (old);


--
-- Name: galaxy galaxy_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_pkey PRIMARY KEY (galaxy_id);


--
-- Name: moon moon_length_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_length_key UNIQUE (length);


--
-- Name: moon moon_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_pkey PRIMARY KEY (moon_id);


--
-- Name: planet planet_length_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_length_key UNIQUE (length);


--
-- Name: planet planet_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_pkey PRIMARY KEY (planet_id);


--
-- Name: star star_age_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_age_key UNIQUE (age);


--
-- Name: star star_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_pkey PRIMARY KEY (star_id);


--
-- Name: moon moon_planet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_planet_id_fkey FOREIGN KEY (planet_id) REFERENCES public.planet(planet_id);


--
-- Name: planet planet_star_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_star_id_fkey FOREIGN KEY (star_id) REFERENCES public.star(star_id);


--
-- Name: star star_galaxy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_galaxy_id_fkey FOREIGN KEY (galaxy_id) REFERENCES public.galaxy(galaxy_id);


--
-- PostgreSQL database dump complete
--

