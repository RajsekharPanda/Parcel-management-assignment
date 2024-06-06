const data = [
   { id: 10, name: "PARCEL1", sequence: 1, group: "Mumbai" },
   { id: 11, name: "PARCEL2", sequence: 2, group: "Mumbai" },
   { id: 13, name: "PARCEL3", sequence: 3, group: "Mumbai" },
   { id: 19, name: "PARCEL4", sequence: 4, group: "Delhi" },
   { id: 18, name: "PARCEL5", sequence: 5, group: "Delhi" },
   { id: 21, name: "PARCEL6", sequence: 6, group: "Kolkata" },
   { id: 12, name: "PARCEL7", sequence: 7, group: "Kolkata" },
   { id: 22, name: "PARCEL8", sequence: 8, group: "Kolkata" },
   { id: 23, name: "PARCEL9", sequence: 9, group: "Kolkata" },
   { id: 24, name: "PARCEL10", sequence: 10, group: "Mumbai" },
   { id: 25, name: "PARCEL11", sequence: 11, group: "Mumbai" },
   { id: 31, name: "PARCEL12", sequence: 12, group: "Mumbai" },
   { id: 34, name: "PARCEL13", sequence: 13, group: "Mumbai" },
   { id: 35, name: "PARCEL14", sequence: 14, group: "Delhi" },
   { id: 41, name: "PARCEL15", sequence: 15, group: "Delhi" },
   { id: 42, name: "PARCEL16", sequence: 16, group: "Delhi" },
   { id: 43, name: "PARCEL17", sequence: 17, group: "Delhi" },
   { id: 44, name: "PARCEL18", sequence: 18, group: "Kolkata" },
   { id: 53, name: "PARCEL19", sequence: 19, group: "Kolkata" },
   { id: 57, name: "PARCEL 20", sequence: 20, group: "Kolkata" }
];

let selectedParcelIndex = -1;

function groupParcels() {
   return data.reduce((acc, parcel) => {
       acc[parcel.group] = acc[parcel.group] || [];
       acc[parcel.group].push(parcel);
       return acc;
   }, {});
}

function drawParcels() {
   const parcelContainer = document.getElementById('parcelContainer');
   parcelContainer.innerHTML = '';

   const parcelGroups = groupParcels();
   Object.keys(parcelGroups).forEach(group => {
       const groupHeader = document.createElement('div');
       groupHeader.className = 'group-header';
       groupHeader.textContent = group;
       parcelContainer.appendChild(groupHeader);

       parcelGroups[group].forEach(parcel => {
           const parcelDiv = document.createElement('div');
           parcelDiv.className = `parcel ${parcel.group}`;
           parcelDiv.onclick = () => selectParcel(parcel);
           parcelDiv.innerHTML = `<span>${parcel.name}</span><span class="parcel-sequence">(${parcel.sequence})</span>`;
           parcelContainer.appendChild(parcelDiv);
       });
   });
}

function selectParcel(parcel) {
   const parcelContainer = document.getElementById('parcelContainer');
   Array.from(parcelContainer.getElementsByClassName('parcel')).forEach(el => el.classList.remove('selected'));

   const index = data.findIndex(p => p.id === parcel.id);
   selectedParcelIndex = (selectedParcelIndex === index) ? -1 : index;

   if (selectedParcelIndex !== -1) {
       parcelContainer.getElementsByClassName('parcel')[selectedParcelIndex].classList.add('selected');
       document.getElementById('selectedParcel').textContent = `Selected Parcel: ${data[selectedParcelIndex].name}`;
   } else {
       document.getElementById('selectedParcel').textContent = 'Selected Parcel: None';
   }

   document.getElementById('parcelName').value = '';
   document.getElementById('parcelGroup').value = 'Mumbai';
}

function addAfter() {
   if (selectedParcelIndex === -1) {
       alert('Please select a parcel first');
       return;
   }

   const name = document.getElementById('parcelName').value.trim();
   const group = document.getElementById('parcelGroup').value;
   if (!name) {
       alert('Please enter a valid parcel name');
       return;
   }

   const newParcel = {
       id: Date.now(),
       name,
       sequence: data[selectedParcelIndex].sequence + 1,
       group
   };

   for (let i = selectedParcelIndex + 1; i < data.length; i++) {
       data[i].sequence++;
   }
   data.splice(selectedParcelIndex + 1, 0, newParcel);
   drawParcels();
}

function addBefore() {
   if (selectedParcelIndex === -1) {
       alert('Please select a parcel first');
       return;
   }

   const name = document.getElementById('parcelName').value.trim();
   const group = document.getElementById('parcelGroup').value;
   if (!name) {
       alert('Please enter a valid parcel name');
       return;
   }

   const newParcel = {
       id: Date.now(),
       name,
       sequence: data[selectedParcelIndex].sequence,
       group
   };

   for (let i = selectedParcelIndex; i < data.length; i++) {
       data[i].sequence++;
   }
   data.splice(selectedParcelIndex, 0, newParcel);
   drawParcels();
}

function replaceParcel() {
   if (selectedParcelIndex === -1) {
       alert('Please select a parcel first');
       return;
   }

   const name = document.getElementById('parcelName').value.trim();
   const group = document.getElementById('parcelGroup').value;
   if (!name) {
       alert('Please enter a valid parcel name');
       return;
   }

   data[selectedParcelIndex].name = name;
   data[selectedParcelIndex].group = group;
   drawParcels();
}

function deleteParcel() {
   if (selectedParcelIndex === -1) {
       alert('Please select a parcel first');
       return;
   }

   data.splice(selectedParcelIndex, 1);
   drawParcels();
   selectedParcelIndex = -1;
   document.getElementById('selectedParcel').textContent = 'Selected Parcel: None';
}

function refreshParcels() {
   drawParcels();
   selectedParcelIndex = -1;
   document.getElementById('selectedParcel').textContent = 'Selected Parcel: None';
}

function showFinalData() {
   console.log(data);
}

drawParcels();
