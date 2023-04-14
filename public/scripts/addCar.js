const addCarForm= document.querySelector('#addCarForm');
const carNameInput= document.querySelector('#carNameInput');
const perDayRentPriceInput= document.querySelector('#perDayRentPriceInput');
const sizeSelect= document.querySelector('#sizeSelect');
const fileInput= document.querySelector('#fileInput');

addCarForm.addEventListener('submit', (event)=> {
	event.preventDefault();

	addCar();
});


async function addCar() {
	try {
		const formData= new FormData();

		formData.append('name', carNameInput.value);
		formData.append('perDayRentPrice', perDayRentPriceInput.value);
		formData.append('size', sizeSelect.value);
		formData.append('image', fileInput.files[0]);

		const req= await fetch('/cars', {
			method: 'POST',
			body: formData,
		});

		const data= await req.json();

		if (!data.success) {
			return alert(data.data.errors[0]);
		}

		localStorage.setItem('showSuccessMessage', 'true');

		location.href= '/';
	} catch (error) {
		console.log(error);

		alert('error in adding car.');
	}
}
