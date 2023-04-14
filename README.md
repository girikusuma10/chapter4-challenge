# Tutorial menggunakan aplikasi

## Deskripsi Projek
Adalah tugas challenge chapter bagian 4 mengenai sistem informasi data mobil pada dashboard admin. Pada tugas kali ini dikerjakan dengan menggunakan teknologi express js, node js, tipe database SQL dan menggunakan ORM sequelize.

## Endpoint
<table>
  <tr>
    <th>endpoint</th>
    <th>method</th>
    <th>header</th>
    <th>request body</th>
    <th>response body</th>
  </tr>
  <tr>
    <td>/cars</td>
    <td>GET</td>
    <td>-</td>
    <td>-</td>
    <td>
      {
      "success": true,
      "message": "aksi berhasil dilakukan.",
      "data": {
        "cars": [
          {
            "id": 11,
            "name": "test",
            "perDayRentPrice": 3000,
            "size": "medium",
            "image": "uY2Nna_BUUjqUxkW9flkV.jpg",
            "createdAt": "2023-04-14T14:17:05.000Z",
            "updatedAt": "2023-04-14T14:17:05.000Z"
          },
          ]
        }
      }
    </td>
  </tr>
  <tr>
    <td>/cars/:id</td>
    <td>GET</td>
    <td>-</td>
    <td>-</td>
    <td>
      {
        "success": true,
        "message": "aksi berhasil dilakukan.",
        "data": {
          "car": {
            "name": "test",
            "perDayRentPrice": 3000,
            "size": "medium"
          }
        }
      }
    </td>
  </tr>
  <tr>
    <td>/cars</td>
    <td>POST</td>
    <td>
      Content-Type: multipart/form-data
    </td>
    <td>
      {
        name: "avanza"
        size: "medium"
        perDayRentPrice: "200000"
        image: File
      }
    </td>
    <td>
      {
        "success": true,
        "message": "aksi berhasil dilakukan.",
        "data": {
          "message": "mobil berhasil ditambahkan"
        }
      }
    </td>
  </tr>
  <tr>
    <td>/cars/:id</td>
    <td>PUT</td>
    <td>
      Content-Type: multipart/form-data
    </td>
    <td>
      {
        name: "avanza Baru"
        size: "medium"
        perDayRentPrice: "210000"
        image: File
      }
    </td>
    <td>
      {
        "success": true,
        "message": "aksi berhasil dilakukan.",
        "data": {
          "message": "mobil berhasil diupdate"
        }
      }
    </td>
  </tr>
  <tr>
    <td>/cars/:id</td>
    <td>DELETE</td>
    <td>-</td>
    <td>
      {
        name: "avanza Baru"
        size: "medium"
        perDayRentPrice: "210000"
        image: File
      }
    </td>
    <td>
      {
        "success": true,
        "message": "aksi berhasil dilakukan.",
        "data": {
          "message": "mobil berhasil diupdate"
        }
      }
    </td>
  </tr>
</table>

## ERD
![Alt text](/erd.png)


## steps :
* buat database dengan nama binar_cars
* git clone di github 
* npm install
* npm run dev
* aplikasi start di port 3000 http://localhost:3000