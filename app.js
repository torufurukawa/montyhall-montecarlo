var app = new Vue({
  el: "#app",
  data: {
    DOOR_COUNT: 3,
    idle: true,
    naiveWinCount: 0,
    smartWinCount: 0,
  },
  computed: {
    naiveWinRate: function() {
      return this.rate(this.naiveWinCount)
    },
    smartWinRate: function() {
      return this.rate(this.smartWinCount)
    }
  },
  methods: {
    start: function(trialCount) {
      // update status
      this.idle = false;

      for (var i=0; i<trialCount; i++) {
        // set prize door
        var prizeIndex = Math.floor( Math.random() * this.DOOR_COUNT );

        // Naive and Smart players always pick #0
        // Now, the host shows a goat behind either #1 or #2,
        // and Smart player chooses #1 or #2 which ever has the goat.

        // Car  Open  Next Choice
        //  0    1     2   .........  case A
        //  1    2     1   .........  case B
        //  2    1     2   .........  case C
        var smartIndex = 2;  // default. Case A and C
        if (prizeIndex == 1 ) {  // Case B
          smartIndex = 1;
        }

        // if car is in #0, incr naive win count
        // else, incr smart win count
        if (prizeIndex == 0) {
          this.naiveWinCount += 1;
        } else if (prizeIndex == smartIndex) {
          this.smartWinCount += 1;
        }
      }

      // update status
      this.idle = true;
    },
    clear: function() {
      this.naiveWinCount = 0;
      this.smartWinCount = 0;
    },
    rate: function(count) {
      if (count == 0) {
        return 0;
      }
      return count / (this.naiveWinCount + this.smartWinCount);
    }
  }
});
