//import Sector from sector;
//import View from view;
//import Controller from controller;

const svg = document.querySelector(".diagram-pie-outline");

const sector = new Sector(statstic[0]);
sector.getPointsOfSector(sector.prop.arc_data).move(5,20);
sector.getPointsOfSector(sector.prop.arc_shadow).move(8,20);
sector.getPointsOfSector(sector.prop.arc_data).angle(3);
const view = new View( svg, sector.prop );
const controller = new Controller( sector, view );

const sector_1 = new Sector(statstic[1]);
sector_1.getPointsOfSector(sector_1.prop.arc_data).move(5,50);
sector_1.getPointsOfSector(sector_1.prop.arc_shadow).move(4,45);
sector_1.getPointsOfSector(sector_1.prop.arc_data).angle(15);
const view_1 = new View( svg, sector_1.prop );
const controller_1 = new Controller( sector_1, view_1 );

const sector_2 = new Sector(statstic[2]);
sector_2.getPointsOfSector(sector_2.prop.arc_data).move(5,70);
sector_2.getPointsOfSector(sector_2.prop.arc_shadow).move(4,70);
sector_2.getPointsOfSector(sector_2.prop.arc_data).angle(20);
const view_2 = new View( svg, sector_2.prop );
const controller_2 = new Controller( sector_2, view_2 );

const sector_3 = new Sector(statstic[3]);
sector_3.getPointsOfSector(sector_3.prop.arc_data).move(5,90);
sector_3.getPointsOfSector(sector_3.prop.arc_shadow).move(4,95);
const view_3 = new View( svg, sector_3.prop );
const controller_3 = new Controller( sector_3, view_3 );

/*===============================================================*/
const svg_1 = document.querySelector(".diagram-pie");

const sector_4 = new Sector(statstic_1[0]);
sector_4.getPointsOfSector(sector_4.prop.arc_data).angle(3);
const view_4 = new View( svg_1, sector_4.prop );
const controller_4 = new Controller( sector_4, view_4 );

const sector_5 = new Sector(statstic_1[1]);
sector_5.getPointsOfSector(sector_5.prop.arc_data).angle(15);
const view_5 = new View( svg_1, sector_5.prop  );
const controller_5 = new Controller( sector_5, view_5 );

const sector_6 = new Sector(statstic_1[2]);
sector_6.getPointsOfSector(sector_6.prop.arc_data).angle(20);
const view_6 = new View( svg_1, sector_6.prop  );
const controller_6 = new Controller( sector_6, view_6 );

const sector_7 = new Sector(statstic_1[3]);
sector_7.getPointsOfSector(sector_7.prop.arc_data).angle(29);
const view_7 = new View( svg_1, sector_7.prop  );
const controller_7 = new Controller( sector_7, view_7 );
