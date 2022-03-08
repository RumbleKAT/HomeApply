create table home_info( id SERIAL primary key not null, 
                        email varchar(100) not null );

create table home_apply( id serial primary key not null, 
					      houseManageNo varchar(10),
					      pblancNo varchar(22),
					      houseDetailSecdNm varchar(10),
					      houseNm varchar(200),
					      bsnsMbyNm varchar(200),
					      rcritPblancDe varchar(10),
					      rceptBgnde varchar(10),
					      rceptEndde varchar(10),
					      przwnerPresnatnDe varchar(10),
					      home_info_id integer REFERENCES mydata (id)
);
