Application Host: https://wapiravaguens.github.io/

1. Name Application: Rent in Chicago

2. Keywords: Rent, crimes, maps.

3. Datasets:  

	* [Affordable Rental Housing Developments] [https://data.cityofchicago.org/Community-Economic-Development/Affordable-Rental-Housing-Developments/s6ha-ppgi] [] [Community Area Name, Community Area Number, Property Type, Property Name, Address, Phone Number, Latitude, Longitude] [253]
	* [Crimes - 2001 to present] [https://data.cityofchicago.org/Public-Safety/Crimes-2017/d62x-nvdr] [] [Latitude, Longitude] []
	* [Police Stations] [https://data.cityofchicago.org/Public-Safety/Police-Stations/z8bn-74gv] [] [DISTRICT, DISTRICT NAME, ADDRESS, PHONE] []
	* [Libraries - Locations, Hours and Contact Information] [https://data.cityofchicago.org/Education/Libraries-Locations-Hours-and-Contact-Information/x8fc-8rcq] [] [NAME, ADDRESS, PHONE, LOCATION] []
	* [Parks - Locations] [https://data.cityofchicago.org/Parks-Recreation/Parks-Locations/wwy2-k7b3/data] [] [Latitude, Longitude] []


	* [Y/N] Do you use the primary dataset ”online climate data” from data.gov? : NO

	* [Y/N] [List] Are all these datasets from data.gov or data.indy.gov? If not, where are they coming from (links)? : YES

4. Brief Description: 

	The project help to find affordable rental housing in chicago, providing a map to facilitate the search and showing basic information like address, phone, community name, crimes etc.

 * Map View:
	1. YES: The map initial location is Department of Computer Science – University of Illinois, Chicago (41.8708° N, 87.6505° W).
	2. YES: There are markers for localization of rent housings, librarys and police stations.
	3. YES: There are labels fort rent, libraries and police stations.
	4. Yes: InfoWindow to show property name, also there are infoWindow to show basic information of librarys and police stations.
	5. [Y/N] [describe] Any other cover on the map (for example, cloud cover to show the weather effect) : NO

 * Data Visualization:
	1. [Y/N] [describe] Use Graph? What is the type? (bar chart, pie chart, radar chart ...) : NO
	2. [Y/N] [List] Any interaction available on the graph? List them (enable click on numbers, drag on lines, change time/variables ...) : NO
	
 * Interaction Form:
	1. YES: There is an information section where the basic information of affordable places is shown.
	2. YES: There is an option to sort according to the distance between affordable places and the Department of Computer Science, also to sort according to ranking of security, nearby libraries and parks nearby.
	3. [Y/N] [List] Any information input? List them. (comments, markers, user preference ...) : NO
	4. YES: 
	* When a place is selected from the list or from the map, the map is centered on the corresponding location and an InfoWindow appears above the marker.
	*	There are buttons to show or hide librarys and police stations markers.
	5. [Y/N] [List] Interaction with data visualization? List them. (filter, sort, set variables ...) : NO

5. Project use jquery and bootstrap.
6. Browsers Test: Chrome