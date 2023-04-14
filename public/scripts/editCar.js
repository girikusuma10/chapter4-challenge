const editCarForm= document.querySelector('#editCarForm');
const carNameInput= document.querySelector('#carNameInput');
const perDayRentPriceInput= document.querySelector('#perDayRentPriceInput');
const sizeSelect= document.querySelector('#sizeSelect');
const fileInput= document.querySelector('#fileInput');

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

window.addEventListener('load', ()=> {
	getCarDetail();
});

editCarForm.addEventListener('submit', (event)=> {
	event.preventDefault();

	editCar();
});

async function getCarDetail() {
	try {
		const req= await fetch(`/cars/${params.id}`);
		const resJson= await req.json();

		const carData= resJson.data.car;

		carNameInput.value= carData.name;
		perDayRentPriceInput.value= carData.perDayRentPrice;
		sizeSelect.value= carData.size;
	} catch (error) {
		alert('Mobil tidak ditemukan');

		location.href= '/';
	}
}

async function editCar() {
	try {
		const formData= new FormData();

		formData.append('name', carNameInput.value);
		formData.append('perDayRentPrice', perDayRentPriceInput.value);
		formData.append('size', sizeSelect.value);
		formData.append('image', fileInput.files[0]);

		const req= await fetch(`/cars/${params.id}`, {
			method: 'PUT',
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
