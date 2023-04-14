const carsList= document.querySelector('#carsList');
const successAlert= document.querySelector('#successAlert');
const deleteAlert= document.querySelector('#deleteAlert');
const filterAll= document.querySelector('#filterAll');
const filterSmall= document.querySelector('#filterSmall');
const filterMedium= document.querySelector('#filterMedium');
const filterLarge= document.querySelector('#filterLarge');
let questionModal;
const cars= [];

window.addEventListener('load', ()=> {
  questionModal=
    new bootstrap.Modal(document.getElementById('exampleModal'));

  if (localStorage.getItem('showSuccessMessage')) {
      successAlert.classList.remove('d-none');
      localStorage.removeItem('showSuccessMessage');

      setTimeout(() => {
        successAlert.classList.add('d-none');
      }, 2000);
  }

  filterAll.addEventListener('click', ()=> {
    filterCars('all', filterAll);
  });

  filterSmall.addEventListener('click', ()=> {
    filterCars('small', filterSmall);
  });

  filterMedium.addEventListener('click', ()=> {
    filterCars('medium', filterMedium);
  });

  filterLarge.addEventListener('click', ()=> {
    filterCars('large', filterLarge);
  });

  getCars();
});

async function getCars() {
  try {
    const req= await fetch('/cars');
    const resJson= await req.json();

    cars.length= 0;
    cars.push(...resJson.data.cars);

    renderCarsCard(cars);
  } catch (error) {
    console.log(error);
  }
}

function filterCars(target, element) {
  if (target=='all') {
    renderCarsCard(cars);
  } else {
    renderCarsCard(cars.filter((car)=> car.size==target));
  }

  document.querySelectorAll('.btnFilter').forEach((el)=> {
    el.classList= 'btnFilter btn btn-outline-primary';
  });

  element.classList= 'btnFilter btn btn-primary text-white btn-outline-primary';
}

async function renderCarsCard(cars) {
  carsList.innerHTML= '';

  if (!cars.length) {
    return carsList.innerHTML= `
      <h4 class="mt-3 text-center">Daftar mobil tidak ditemukan</h4>
    `;
  }

  cars.forEach((car)=> {
    const carUpdateDate= new Date(car.updatedAt);

    carsList.innerHTML+= `
      <div class="col-4 mt-3">
        <div class="card">
          <img src="/images/${car.image}" class="card-img-top"
          style="object-fit: cover; width: 100%; height: 240px;" />

          <div class="card-body">
            <h6>${car.name}/${car.size}</h6>
            <h5>${formatCurrency(car.perDayRentPrice)} / hari</h5>
            <p><i class="fa fa-clock mr-3"></i> 
              updated at ${carUpdateDate.getDate()} 
              ${carUpdateDate.getUTCMonth()} ${carUpdateDate.getFullYear()},
              ${carUpdateDate.getHours()}:${carUpdateDate.getMinutes()}
            </p>

            <div class="actionSection">
              <button class="deleteBtn btn btn-outline-danger" 
                data-id="${car.id}">
                <i class="fa fa-trash"></i>
                Hapus
              </button>
              <a href="/editCar?id=${car.id}">
                <button class="btn btn-success">
                  <i class="fa fa-edit"></i>    
                  Edit
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  assignCarButtonActions();
}

function formatCurrency(currency) {
  return Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(currency);
}

function assignCarButtonActions() {
  document.querySelectorAll('.actionSection').forEach((carEl)=> {
    const deleteBtn= carEl.querySelector('.deleteBtn');

    deleteBtn.addEventListener('click', ()=> {
      deleteCar(deleteBtn.dataset.id);
    });
  });
}

function deleteCar(id) {
  questionModal.show();

  document.querySelector('#modalDeleteBtn')
  .addEventListener('click', async ()=>{
    questionModal.hide();

    try {
      await fetch(`/cars/${id}`, {
        method: 'DELETE',
      });

      getCars();

      deleteAlert.classList.remove('d-none');

      setTimeout(() => {
        deleteAlert.classList.add('d-none');
      }, 2000);
    } catch (error) {
      alert('data gagal dihapus');
    }
  });
}
