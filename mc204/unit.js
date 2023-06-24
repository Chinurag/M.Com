var stopwatches = {};
    var currentTaskId = null;
    
    function toggleDescription(taskId) {
      var taskDescription = document.getElementById(taskId);
      taskDescription.classList.toggle('open');
      
      if (taskDescription.classList.contains('open')) {
        startStopwatch(taskId);
      } else {
        stopStopwatch(taskId);
      }
    }
    
    function startStopwatch(taskId) {
      if (currentTaskId && currentTaskId !== taskId) {
        stopStopwatch(currentTaskId);
      }
      
      currentTaskId = taskId;
      
      var startTime = new Date().getTime();
      stopwatches[taskId] = setInterval(function() {
        updateStopwatch(taskId, startTime);
      }, 100);
    }
    
    function stopStopwatch(taskId) {
      clearInterval(stopwatches[taskId]);
      currentTaskId = null;
    }
    
    function updateStopwatch(taskId, startTime) {
      var currentTime = new Date().getTime();
      var totalTime = currentTime - startTime;
      
      var hours = Math.floor(totalTime / (1000 * 60 * 60));
      var minutes = Math.floor((totalTime % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((totalTime % (1000 * 60)) / 1000);
      
      var stopwatchElement = document.getElementById(taskId + '-stopwatch');
      stopwatchElement.textContent = padZero(hours) + ":" + padZero(minutes) + ":" + padZero(seconds);
    }
    
    function padZero(number) {
      return number < 10 ? "0" + number : number;
    }
  
    
      function updateProgressBar() {
        var checkboxes = document.querySelectorAll('input[type="checkbox"]');
        var checkedCount = 0;
        
        for (var i = 0; i < checkboxes.length; i++) {
          if (checkboxes[i].checked) {
            checkedCount++;
          }
        }
        
        var progressPercentage = (checkedCount / checkboxes.length) * 100;
        var progressBar = document.getElementById('progress-bar-inner');
        var progressBarText = document.getElementById('progress-bar-text');
        progressBar.style.width = progressPercentage + "%";
        progressBar.style.backgroundColor = getColor(progressPercentage);
        progressBarText.textContent = progressPercentage + "%";
  
        // Save checkbox state to localStorage
        var checkboxStates = {};
        for (var i = 0; i < checkboxes.length; i++) {
          checkboxStates[checkboxes[i].id] = checkboxes[i].checked;
        }
        localStorage.setItem('checkboxStates', JSON.stringify(checkboxStates));
      }
      
      function getColor(percentage) {
        var red = Math.floor(255 - (percentage / 100) * 255);
        var green = Math.floor((percentage / 100) * 255);
        return "rgb(" + red + ", " + green + ", 0)";
      }
  
      // Retrieve checkbox state from localStorage and update checkboxes
      function restoreCheckboxStates() {
        var checkboxStates = localStorage.getItem('checkboxStates');
        if (checkboxStates) {
          checkboxStates = JSON.parse(checkboxStates);
          var checkboxes = document.querySelectorAll('input[type="checkbox"]');
          for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxStates[checkboxes[i].id]) {
              checkboxes[i].checked = true;
            }
          }
          updateProgressBar(); // Update progress bar based on restored state
        }
      }
  
      // Call the restoreCheckboxStates function when the page is loaded
      window.addEventListener('load', restoreCheckboxStates);
    