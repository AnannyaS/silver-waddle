$("#refresh").on('click', function (uleaveBal) {
     var sum = 0;
     for(var i = 0; i<user.leaveBal.length ; i++){
          sum += user.leaveBal[i] ; 
      }
     console.log("total leave balance = " + sum);

     $('#totLeaveBal').val(sum);
    });

    ///////////////////////////////////////////////////////////

    $("#refresh").on('click', function LvBal(leaveBal) {
      var sum = 0;
      for(var i = 0; i<leaveBal.length ; i++){
        sum += leaveBal[i] ; 
         console.log("total leave balance = " + sum);
      }
      console.log("total leave balance = " + LvBal(user.leaveBal));
    });

    /////////////////////////////////////////////////////////////////

    var el = $('#elbal').val();
        cl = $('#clbal').val(), 
        sl = $('#slbal').val();
    var summ = parseInt(el);
    $('#leavetyp').each(function(){
       sum += number($(this).val());
     });
    $('#totLeaveBal').val(sum);
             // from = moment(fromDate, 'DD-MM-YYYY');
         // to = moment(toDate, 'DD-MM-YYYY');   
         //sum += Number($(this).val())
         // /* using diff */
         // duration = ((to.diff(from, 'days'))/365);
         // var diff = parseInt(duration) + 1;
         /* show the result */
         //  if(sdiffr != undefined){
        //  $('#result').text(sdiffr);

///////////////////////////////////////////////////

$("#refresh").on('click', function() {
  function LvBal(leaveBal) {
     var sum = 0;
     for(var i = 0; i<leaveBal.length ; i++){
       sum += leaveBal[i] ; 
       console.log("adding to leave balance = " + sum);
      }
    return sum;
  }
  console.log("total leave balance = " + LvBal(user.leaveBal));
   var summ =  LvBal(user.leaveBal);
 $('#totLeaveBal').val(summ);
});

/////////////////////////////////////////////////////////
