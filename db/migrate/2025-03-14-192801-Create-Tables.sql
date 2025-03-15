/* Setup tables for cms */
CREATE TABLE fragmenta_metadata (
    id SERIAL NOT NULL,
    updated_at timestamp,
    fragmenta_version text,
    migration_version text,
    status int
);

ALTER TABLE fragmenta_metadata OWNER TO "app_server";

CREATE TABLE users (
id SERIAL NOT NULL,
created_at timestamp,
updated_at timestamp,
status integer,
role integer,
name text,
email text,
title text,
summary text,
text text,
image_id integer,
password_hash text,
password_reset_token text,
password_reset_at timestamp
);
ALTER TABLE users OWNER TO "app_server";

CREATE TABLE tags (
id SERIAL NOT NULL,
created_at timestamp,
updated_at timestamp,
parent_id integer,
name text,
summary text,
url text,
sort integer,
dotted_ids text,
status integer
);
ALTER TABLE tags OWNER TO "app_server";

DROP TABLE IF EXISTS images;
CREATE TABLE images (
id SERIAL NOT NULL,
created_at timestamp,
updated_at timestamp,
status integer,
author_id integer,
path text,
sort integer,
name text
);
ALTER TABLE images OWNER TO "app_server";

DROP TABLE IF EXISTS pages;
CREATE TABLE pages (
id SERIAL NOT NULL,
created_at timestamp,
updated_at timestamp,
status integer,
author_id integer,
url text,
name text,
summary text,
keywords text,
template text,
text text
);
ALTER TABLE pages OWNER TO "app_server";

CREATE TABLE posts (
id SERIAL NOT NULL,
created_at timestamp,
updated_at timestamp,
keywords text,
template text,
text text,
status integer,
author_id integer,
name text,
summary text
);
ALTER TABLE posts OWNER TO "app_server";

DROP TABLE IF EXISTS redirects;
CREATE TABLE redirects (
id SERIAL NOT NULL,
created_at timestamp,
updated_at timestamp,
new_url text,
old_url text
);
ALTER TABLE redirects OWNER TO "app_server";

