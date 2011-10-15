<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
<script type="text/javascript" src="{SITE URL}/jquery.highlight-latest.min.js"></script>

<style type="text/css">
    .highlight { background-color: #FFFF99;}

	ul
	{
	list-style: none;
	padding: 0;
	margin: 0;
	} 

	ul li {  
    display:block;  
    float:none;  
	border-top:1px dotted  #FF6600;  
    border-bottom:1px dotted  #FF6600;  
    padding:3px;  
    background-color:#F8F8F8;  
    margin:1px;  
    color:003366  
} 
</style>

<script language = "javascript">
function ClearResults()
{
$("#AnnouncementData").empty();
$("#resultCount").empty();
}

function Search(query)
{
//Clear the results pane.
ClearResults();

//Prepare the soap request
var soapPacket = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/'> \
   <soapenv:Body> \
    <GetListItems xmlns='http://schemas.microsoft.com/sharepoint/soap/'> \
     <listName>Calendar</listName> \
	<query><Query><Where><Contains><FieldRef Name='Location'/><Value Type='Text'>" + query + "</Value></Contains></Where></Query></query> \
     <viewFields> \
      <ViewFields> \
		 <FieldRef Name='Title' /> \
		 <FieldRef Name='Location' /> \
		 <FieldRef Name='EventDate' /> \
		 <FieldRef Name='EndDate' /> \
      </ViewFields> \
     </viewFields> \
    </GetListItems> \
   </soapenv:Body> \
  </soapenv:Envelope>";

jQuery.ajax({
  url: "_vti_bin/lists.asmx",
  type: "POST",
  dataType: "xml",
  data: soapPacket,
  complete: processResult,
  contentType: "text/xml; charset=\"utf-8\""
 });
 
} 


function processResult(xData, status) 
{
	//alert(xData.responseText);
	var count=0;
	
	//Loop through the rows returned from the web service call and generate the resulting html.
	jQuery(xData.responseXML).find("z\\:row").each(function() 
	{
	    //Prepare the li element with the returned rows.
		$("<li>" +  $(this).attr("ows_EventDate") + " | " + $(this).attr("ows_Title") + " | " + $(this).attr("ows_Location") + "</li>").appendTo("#AnnouncementData");
		count=count+1;
	});
	
	//Generate the panel that displays count or rows returned from the call.
    $("<div class='ms-informationbar' id='clearResults'><b>X</b> " + count + " records found.</div>").appendTo("#resultCount");
	
	//Start displaying the results div
	$("#quickSearchResults").fadeIn("slow");

	//Highlight the searched term in the search result.
	$("#quickSearchResults").highlight($('#quickSearchTextBox').val());

    //Display the count of rows in the result set.  
	$("#resultCount").fadeIn("slow");

} 


$(document).ready( function()
{
	//Adding the hander to clear search results when user clicks on "X"
	$("#clearResults").live('click',function(event){
	ClearResults();
	});

    //Add event handler to initiate search when the search button is clicked.
	$('td .ms-sbgo').bind('click',function(event)
	{
	Search($('#quickSearchTextBox').val());
	});

    //Add event hander to initiate search when enter key is pressed.
	$('#quickSearchTextBox').keydown(function(event)
	{
		var query = $('#quickSearchTextBox').val();
		if (event.keyCode == '13') 
		{
			Search(query);
		}
   });
}); 


</script>
<table id="quickSearchTable" class="ms-sbtable ms-sbtable-ex" border="0">
    <tbody>
        <tr class="ms-sbrow">
            <td class="ms-sbcell">
	                <span class='ms-formlabel'>Event Location:  </span>
	                    <input style="width: 100%" id="quickSearchTextBox" class="ms-sbplain"
	                     style="width: 170px" maxlength="200" value="" />
            </td>
            <td class="ms-sbgo ms-sbcell" style="width: 14px">
                <img id="cmdSearch" title="Go Search" style="border-top-width: 0px; border-left-width: 0px; border-bottom-width: 0px;
                    border-right-width: 0px" alt="Go Search" src="/_layouts/images/gosearch.gif" />
            </td>
            <td style="width: 1px">
            </td>
        </tr>
    </tbody>
</table>
<table>
<tr>
	<td>
		<div id="resultCount"></div>
	</td>
</tr>
<tr>
	<td>
		<div id="quickSearchResults">
		<ul id="AnnouncementData"></ul> 
		</div>
	</td>
</tr>
</table>