let currentStep = 1;

        function nextStep(inputName, value) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = inputName;
            input.value = value;
            document.querySelector('form').appendChild(input);

            document.getElementById(`step${currentStep}`).classList.remove('active');
            currentStep++;
            document.getElementById(`step${currentStep}`).classList.add('active');
        }

        function showSubmit() {
            document.getElementById(`step${currentStep}`).classList.remove('active');
            document.getElementById('submit-container').style.display = 'block';
        }