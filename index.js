 // JavaScript code

    // Get references to the relevant HTML elements
    const streamSelect = document.getElementById('stream');
    const semesterSelect = document.getElementById('semester');
    const subjectSelect = document.getElementById('subjects');
    const submitBtn = document.getElementById('submitBtn');

    // Define the available options for each stream and semester
    const options = {
      jmc: {
        semesters: ['1st', '2nd', '3rd', '4th'],
        subjects: {
          '1st': ['JMC101', 'JMC102'],
          '2nd': ['JMC201', 'JMC202']
          // Add subjects for other semesters in journalism
        }
      },
      mba: {
        semesters: ['1st Semester', '2nd Semester', '3rd Semester'],
        subjects: {
          '1st Semester': ['Subject 1', 'Subject 2'],
          '2nd Semester': ['Subject 3', 'Subject 4']
          // Add subjects for other semesters in MBA
        }
      },
      mcom: {
        semesters: ['1st', '2nd', '3rd', '4th'],
        subjects: {
          '1st': ['MC101', 'MC102', 'MC103', 'MC104'],
          '2nd': ['MC201', 'MC202', 'MC203', 'MC204', 'MC205', 'MC206']
          // Add subjects for other semesters in M.Com
        }
      }
    };

    // Populate semester dropdown based on the selected stream
    streamSelect.addEventListener('change', function() {
      const selectedStream = this.value;
      const semesterOptions = options[selectedStream].semesters;
      populateDropdown(semesterSelect, semesterOptions);
    });

    // Populate subject dropdown based on the selected semester
    semesterSelect.addEventListener('change', function() {
      const selectedStream = streamSelect.value;
      const selectedSemester = this.value;
      const subjectOptions = options[selectedStream].subjects[selectedSemester];
      populateDropdown(subjectSelect, subjectOptions);
    });

    // Display selected options in the input box
    submitBtn.addEventListener('click', function() {
      const selectedStream = streamSelect.value;
      const selectedSemester = semesterSelect.value;
      const selectedSubject = subjectSelect.value;

      // Build the URL based on the selected options
      let url = 'https://chinurag.github.io/';

      if (selectedStream === 'jmc') {
        url += 'm/';
      } else if (selectedStream === 'mba') {
        url += 'm/';
      } else if (selectedStream === 'mcom') {
        url += 'm/';
      }
      url += `${selectedSemester.toLowerCase()}/${selectedSubject.toLowerCase()}.html`;

      // Redirect the user to the generated URL
      window.location.href = url;
    });

    // Helper function to populate a dropdown with options
    function populateDropdown(dropdown, options) {
      dropdown.innerHTML = '';
      options.forEach(function(option) {
        const optionElement = document.createElement('option');
        optionElement.textContent = option;
        dropdown.appendChild(optionElement);
      });
    }

    // Function to toggle the slide menu
    function toggleMenu() {
      const slideMenu = document.getElementById('slide-menu');
      slideMenu.classList.toggle('open');
    }