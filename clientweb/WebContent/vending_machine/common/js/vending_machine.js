// item 배열 생성
var item = new Array(12);
function itemBasket(){
var itemName="";
var itemPrice=0;
var itemAmount=0;
var buffer=0;
}
for(i=0;i<item.length;i++){
	item[i] = new itemBasket();
	item[i].itemAmount=0;
	item[i].buffer=0;
}
// 초기화
item[0].itemName = "파르페";
item[0].itemPrice = 1000;
item[1].itemName = "오렌지 쥬스";
item[1].itemPrice = 1100;
item[2].itemName = "핫도그";
item[2].itemPrice = 1200;
item[3].itemName = "모듬과일";
item[3].itemPrice = 1300;
item[4].itemName = "햄버거";
item[4].itemPrice = 1400;
item[5].itemName = "랍스터 꼬치";
item[5].itemPrice = 1500;
item[6].itemName = "국수";
item[6].itemPrice = 1600;
item[7].itemName = "모듬꼬치";
item[7].itemPrice = 1700;
item[8].itemName = "오징어구이";
item[8].itemPrice = 1800;
item[9].itemName = "핏짜";
item[9].itemPrice = 1900;
item[10].itemName = "새우볶음밥";
item[10].itemPrice = 2000;
item[11].itemName = "스낵";
item[11].itemPrice = 2100;

//getItem 배열 생성
var myList = new Array(12);
for(i=0;i<item.length;i++){
	myList[i] = 0;
}

// 동작관련 변수
var amount=0;
var css_zidx = 10;
var totalPrice=0;
var deg=0;
var rotaReturn = false;
var resetRun=false;
//
$(document).ready(function(){
	//reset
	$("#reset").on("click",function(){
		if(resetRun == false){
			rotationInterval = setInterval(function() {
				if(rotaReturn == false){
					resetRun=true;
					deg+=10;
					$("#reset").css({transform: 'rotate('+deg+'deg)'});
					if(deg==90){
						rotaReturn = true;
					}
				}
				else{
					deg-=10;
					$("#reset").css({transform: 'rotate('+deg+'deg)'});
					if(deg==0){
						rotaReturn = false;
						clearInterval(rotationInterval);
						deg=0;
						resetRun=false;
					}
				}
				
			}, 10);
		}
		if(amount>0){
			$("#coin img").attr("src","./image/coin2.png");
		}
		
		amount=0;
		for(i=0;i<item.length;i++){
			item[i].itemAmount=0;
		}
		totalPrice=0;
		$("#info").html("투입구에 돈을 넣으세요.(drag)");
		$("#amount").html("잔액 : " + amount+"<br>잔액이 반환되었습니다.");
	});
	
	//set
	$("#set").on("click",function(){
		runEffect();
		if(amount<totalPrice){
			$("#amount").html("잔액 : " + amount+"<br>금액이 부족합니다.");
		}
		else{
			SetBasket();
			for(i=0;i<item.length;i++){
				item[i].itemAmount=0;
			}
			amount-=totalPrice;
			totalPrice=0;
			$("#info").html("투입구에 돈을 넣으세요.(drag)");
			$("#amount").html("잔액 : " + amount+"<br>결제가 완료되었습니다.");
		}
	});
	
	function runEffect() {
	     var options = {};
	      $("#set").effect("bounce", options, 500, function (){
	  		setTimeout(function() {}, 1000 )
	  		});
	      };
	      
	function highlightEffect() {
		var options = {};
		$("#output").effect("highlight", options, 500, function (){
			setTimeout(function() {}, 1000 )
			});
		};
		
	function SetBasket(){
		for(i=0;i<item.length;i++){
			if(item[i].itemAmount > 0){
				item[i].buffer += item[i].itemAmount;
			}
		}
	}
	
	$("#output").on("click", function(){
		highlightEffect();
		var list="";
		for(i=0;i<item.length;i++){
			if(item[i].buffer > 0){
				myList[i] += item[i].buffer;
				item[i].buffer = 0;
			}
			if(myList[i]>0){
				list+="<div><img style='width:100px; height:100px;' alt='item"+(i+1)+"' src='./image/item"+(i+1)+".png'> X "+myList[i]+"</div>";
			}	
		}
		$("#myList").html(list);
	});
	
	$("#coin").on("click", function(){
		var options = {};
		$(this).effect("highlight", options, 500, function (){
			setTimeout(function() {}, 1000 )
			});
		$("#coin img").attr("src","./image/coin.png");
	});
	// pocket
	var pocketHide = false;
	$("#pocket button").on( "click", function() {
		if(pocketHide == false){
			$("#pocket").animate({'right':'-340px'},800);
			pocketHide = true;
		}
		else{
			$("#pocket").animate({'right':'0px'},800);
			pocketHide = false;
		}
	});
	
	$("#pocket button").click(function(){
		$("#pocket button").toggle();
	});
	
	// basket
	var basketHide = false;
	$("#basket button").on( "click", function() {
		if(basketHide == false){
			$("#basket").animate({'right':'-340px'},800);
			basketHide = true;
		}
		else{
			$("#basket").animate({'right':'0px'},800);
			basketHide = false;
		}
	});
	
	$("#basket button").click(function(){
		$("#basket button").toggle();
	});
	
	// order window
	orderList="";
	totalOrder=0;
	for(i=0; i<item.length;i++){
		$("#plusItem"+(i+1)).on("click",function(){
			id = $(this).attr("id");
			orderList="";
			for(i=0; i<item.length;i++){
				if( id == "plusItem"+(i+1)){
					item[i].itemAmount ++;
					totalPrice += item[i].itemPrice;
				}
				if(item[i].itemAmount > 0){
					orderList += ("[" + item[i].itemName + "] - [" + item[i].itemAmount + "EA] - [" + (item[i].itemPrice) + "원]<br>");
				}
				totalOrder+=(item[i].itemAmount * item[i].itemPrice);
			}
			$("#info").text("잔액 : " + amount + "원");
			$("#info").html("주문상품<br>"+orderList+"toal :  "+totalPrice+"원");
		});
		
		$("#minusItem"+(i+1)).on("click",function(){
			id = $(this).attr("id");
			orderList="";
			for(i=0; i<item.length;i++){
				if(item[i].itemAmount <= 0){
					continue;
				}
				if( id == "minusItem"+(i+1)){
					item[i].itemAmount --;
					totalPrice -= item[i].itemPrice;
				}
				if(item[i].itemAmount > 0){
					orderList += ("[" + item[i].itemName + "] - [" + item[i].itemAmount + "EA] - [" + (item[i].itemPrice) + "원]<br>");
				}
				totalOrder+=(item[i].itemAmount * item[i].itemPrice);
			}
			$("#info").text("잔액 : " + amount + "원");
			$("#info").html("주문상품<br>"+orderList+"toal :  "+totalPrice+"원");
		});
		$("#itemName"+(i+1)).html(item[i].itemName);
		$("#itemPrice"+(i+1)).html(item[i].itemPrice);
	}
	// 투입구
	$( function() {
    	$( ".ui-widget-content" ).draggable({
    		create: function( event, ui ) {
				if( $(this).hasClass("in-parent")) {
					$(this).draggable( "option", "containment", "parent");
				}
   			},
    		start: function( event, ui ) {
				css_zidx++;
				$(this).css({"z-index":css_zidx,"box-shadow":"0 1px 2px 0 rgba(0,0,0,0.1), 0 4px 8px 0 rgba(0,0,0,0.2)"
				}).draggable( "option", "revert", true );
			},
			stop: function( event, ui ) {
				$(this).css({"box-shadow":""});
			}
    	});
    	$( "#droppable" ).droppable({
    		accept: '.ui-widget-content',
      		drop: function( event, ui ) {
        		
      			money=parseInt(ui.draggable.text());
        		//console.log(money);
        		amount+=money;
        		$("#amount").text("잔액 : " + amount + "원");
      		}
    	
    	});
   		$( "#pocket" ).droppable({
   			drop: function( event, ui ) {
   				ui.draggable.draggable( "option", "revert", false);
   			}
  		});
	});
});


