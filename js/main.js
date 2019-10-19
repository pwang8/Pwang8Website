/**   This function is taken from the w3schools example code
 *    credits to: https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_eff_animate_smoothscroll
 */
$(document).ready(function(){
      // Add smooth scrolling to all links
      $("a").on('click', function(event) {

            // Make sure this.hash has a value before overriding default behavior
            if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            //Changed the time 800ms to 600ms
            $('html, body').animate({
            scrollTop: $(hash).offset().top
            }, 600, function(){

            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
            });
            } // End if
      });
});

/**   Otherwise people won't see my beautiful landing page on refresh :(
 *
 */
window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    }

// window loader, add animation after loading screen disappears
$(window).on('load', function() {
      // Animate loader off screen
      $(".se-pre-con").fadeOut("slow");
      $("landing").addClass("fadeIn animated");
      $("#landing-title-name").addClass("fadeIn animated animation-delay-500");
      //$("#landing-link-section").addClass("pulse animated animation-delay-1200");

});
