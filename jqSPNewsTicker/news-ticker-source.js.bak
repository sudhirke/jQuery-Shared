$(document).ready(function() 
{
	//Call the method to read data from annoucements list and display it as carousel.
	GetAnnoucementData();
});

/*
This function reads the data from annoucement list and passes the control to processResults method
This makes and ajax call to lists.asmx web service.
Make sure to replace {Site URL} with your SharePoint site url.
*/
function GetAnnoucementData() 
{

//Prepare the SOAP envelop for calling GetListItems method from lists.asmx web service
var soapEnv = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/'> \
   <soapenv:Body> \
    <GetListItems xmlns='http://schemas.microsoft.com/sharepoint/soap/'> \
     <listName>Announcements</listName> \
     <viewFields> \
      <ViewFields> \
		 <FieldRef Name='ows_ID' /> \
		 <FieldRef Name='LinkTitleNoMenu' /> \
		 <FieldRef Name='Body' /> \
		 <FieldRef Name='Expires' /> \
		 <FieldRef Name='Author' /> \
      </ViewFields> \
     </viewFields> \
    </GetListItems> \
   </soapenv:Body> \
  </soapenv:Envelope>";

/*Post the request envelop to web service thorugh ajax request and pass the results to processResults method*/			
        $.ajax({
            url: "{SITE URL}/_vti_bin/lists.asmx",
            type: "POST",
            dataType: "xml",
            data: soapEnv,
            complete: processResult,
            contentType: "text/xml; charset=\"utf-8\""
        });    
}

/* This method parses the resultant xml and prepares the display.
Please replace {Site Url} with your sharepont site url.
*/
function processResult(xData, status) 
{
		//Select the root element.
        var newnews =$("#newsItems"); 

        var rows;
		
		//Check if query returns no rows
        if (xData.responseXML.getElementsByTagName("z:row").length==0)
        {
			//Prepare the display for 0 rows.
			var url = "{SITE URL}/Lists/Announcements/";
			var head = "<li><div class='thumbnail'> <img src='{SITE URL}/Shared%20Documents/BIN/css/news-ticker/images/news1.jpg'></div>";
            var body = "<div class='info'>No news items<a href=" + url + "> Read all</a> <span class='cat'> no items found</span></div>";
			var tail = "<div class='clear'></div></li>";
			var liHtml = head + body + tail;
			
			//Append the HTML element to newNews element
            newnews.append(liHtml);
        }
        else
        {
			//Read all the rows from responseXml
			rows = xData.responseXML.getElementsByTagName("z:row");

			jQuery(rows).each(function() 
			{
			//Read the information from returned rows
            var url = "{SITE URL}/Lists/Announcements/DispForm.aspx?ID=" + $(this).attr("ows_ID");
			var title = $(this).attr("Title");
			var news = $(this).attr("ows_Body");
			var author = $(this).attr("ows_Author");
			author = author.split('#')[1];

			//Prepare the div element
			var head = "<li><div class='thumbnail'><img src='{SITE URL}/Shared%20Documents/BIN/css/news-ticker/images/news1.jpg'></div>";
            var body = "<div class='info'><a href=" + url + ">" +  $(this).attr("ows_Title")+ "</a> <span class='cat'>by " + author + "</span></div>";
			var tail = "<div class='clear'></div></li>";
			var liHtml = head + body + tail;

			//Append the resultant element onto newNews element
            newnews.append(liHtml);
			});
        }
		
		//Append entire newNews element to root Div
		newnews.appendTo(".newsticker-jcarousellite");
		
		//Prepare the Carousel of all the returned items
		$(".newsticker-jcarousellite").jCarouselLite({
		vertical: true,
		hoverPause: true,
		visible: 4,
		auto:500,
		speed:1000
		});

    }
