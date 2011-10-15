$(document).ready(function () {
		   $().SPServices({
						webURL:"http://<SERVER>/SITES/Test", 
						operation: "GetListItems",
						async: false,
						listName: "Contacts",
						CAMLQuery: "<Query>" +
											"<OrderBy><FieldRef Name='FullName' Ascending='TRUE'/></OrderBy>" +
											"</Query>",
						CAMLViewFields: "<ViewFields>" +
														"<FieldRef Name='FullName' />" +
														"<FieldRef Name='Company' />" +
														"<FieldRef Name='JobTitle' />" +
														"<FieldRef Name='WorkPhone' />" +
														"<FieldRef Name='Email' />" +														
													"</ViewFields>",
						CAMLRowLimit: 0,
						completefunc: processResult
					});

			function processResult(xData, status) 
				{
					$(xData.responseXML).find("z\\:row").each(function()	{
						var fullName = $(this).attr("ows_FullName");
						var company = $(this).attr("ows_Company");	
						var jobTitle = $(this).attr("ows_JobTitle");	
						var workPhone = $(this).attr("ows_WorkPhone");	
						var Email = $(this).attr("ows_Email");	
						var imageLink = "http://<SERVER>/_layouts/images/no_pic.gif";

						/* Sudhir Ke: Use this line if you have added a image field in your contact list
						var imageLink = $(this).attr("ows_Image").split(',')[0];
						*/
						var html = '<div id="card" class="mydiv">' +
									'<div id="details" class="details">' +
									'<span class="contactname">' + fullName+ '</span><br/>' +
									'<span class="contactinfo">' + jobTitle + '</span><br/>' +
									'<span class="contactinfo">' + company +'</span><br/>'+
									'<span class="contactinfo">' + workPhone +'</span><br/>'+
									'<span class="contactinfo">' + Email+ '</span><br/></div>' +
									'<img src="' + imageLink+ '" class="contact"/></div>';
						$('#result').append(html);
					});

					//alert(xData.responseText);
					 
					 $(".mydiv").mouseover(function () {
						$(this).toggleClass("ui-state-highlight");

					});

					
					$(".mydiv").mouseout(function () {
						$(this).toggleClass("ui-state-highlight");
					});
					
				}
            
        });