const totalSteps = 7;
let currentStep = 1;

function updateProgress() {
  const progress = document.getElementById('progress');
  progress.style.width = `${((currentStep - 1) / (totalSteps - 1)) * 100}%`;
}

function showStep(step) {
  document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
  document.getElementById(`step-${step}`).classList.add('active');
  currentStep = step;
  updateProgress();
  if (step === 7) generateReview();
}

function nextStep(step) {
  const currentInputs = document.getElementById(`step-${currentStep}`).querySelectorAll('input[required], select[required]');
  let valid = true;
  currentInputs.forEach(input => {
    if (!input.value) {
      valid = false;
      input.classList.add('border-red-500');
    } else {
      input.classList.remove('border-red-500');
    }
  });
  if (!valid) {
    alert('Please fill out all required fields in this step.');
    return;
  }
  showStep(step);
}

function prevStep(step) {
  showStep(step);
}

function generateReview() {
  const summary = document.getElementById('reviewSummary');
  summary.innerHTML = `
    <p><strong>Name:</strong> ${document.getElementById('fullName').value}</p>
    <p><strong>DOB:</strong> ${document.getElementById('dob').value}</p>
    <p><strong>Gender:</strong> ${document.getElementById('gender').value}</p>
    <p><strong>Phone:</strong> ${document.getElementById('phone').value}</p>
    <p><strong>Email:</strong> ${document.getElementById('email').value}</p>
    <p><strong>Address:</strong> ${document.getElementById('address').value}</p>
    <p><strong>Conditions:</strong> ${document.getElementById('conditions').value}</p>
    <p><strong>Allergies:</strong> ${document.getElementById('allergies').value}</p>
    <p><strong>Surgeries:</strong> ${document.getElementById('surgeries').value}</p>
    <p><strong>Symptoms:</strong> ${document.getElementById('symptoms').value}</p>
    <p><strong>Pain Level:</strong> ${document.getElementById('painLevel').value}</p>
    <p><strong>Smoking:</strong> ${document.querySelector('input[name="smoke"]:checked')?.value || 'Not specified'}</p>
    <p><strong>Medications:</strong> ${document.getElementById('medications').value}</p>
    <p><strong>Supplements:</strong> ${document.getElementById('supplements').value}</p>
    <p><strong>Emergency Contact:</strong> ${document.getElementById('emergencyName').value} (${document.getElementById('emergencyRelation').value}), ${document.getElementById('emergencyPhone').value}</p>
  `;
}

document.getElementById('submitBtn').addEventListener('click', () => {
  if (!document.getElementById('consent').checked) {
    alert('Please agree to the consent.');
    return;
  }
  
  const formData = {
    fullName: document.getElementById('fullName').value,
    dob: document.getElementById('dob').value,
    gender: document.getElementById('gender').value,
    phone: document.getElementById('phone').value,
    email: document.getElementById('email').value,
    address: document.getElementById('address').value,
    conditions: document.getElementById('conditions').value,
    allergies: document.getElementById('allergies').value,
    surgeries: document.getElementById('surgeries').value,
    symptoms: document.getElementById('symptoms').value,
    painLevel: document.getElementById('painLevel').value,
    smoke: document.querySelector('input[name="smoke"]:checked')?.value,
    medications: document.getElementById('medications').value,
    supplements: document.getElementById('supplements').value,
    emergencyName: document.getElementById('emergencyName').value,
    emergencyRelation: document.getElementById('emergencyRelation').value,
    emergencyPhone: document.getElementById('emergencyPhone').value,
  };

  localStorage.setItem('medicalFormData', JSON.stringify(formData));

  document.getElementById('medicalForm').classList.add('hidden');
  document.getElementById('successMessage').classList.remove('hidden');
});

updateProgress();