const form = document.getElementById('medicineForm');
const nameInput = document.getElementById('name');
const expiryInput = document.getElementById('expiry');
const typeInput = document.getElementById('type');
const medicineList = document.getElementById('medicine-list');
const checklist = document.getElementById("checklist");
const todayDate = document.getElementById("todayDate");

const today = new Date();
const options={weekday :'long',year:'numeric',month:'long',day:'numeric'};
todayDate.innerText = `Today's Checklist: ${today.toLocaleDateString('en-US', options)}`;

form.addEventListener('submit',function(e){
    e.preventDefault();
    const medName = nameInput.value.trim();
    const medExpiry = expiryInput.value;
    const medType = typeInput.value;
    const medQty = document.getElementById('quantity').value;

    const card=document.createElement('div');
    card.classList.add('medicine-card');
    card.setAttribute('data-type', medType); 
    const isExpired = new Date(medExpiry)<today;

    card.innerHTML =`
    <h3>${medName}</h3>
    <p><strong>Type:</strong> ${medType}</p>
     <p><strong>Quantity:</strong> ${medQty}</p>
     <p><strong>Expiry:</strong> ${medExpiry}</p>
    ${isExpired ? `<p class="expired">⚠️ This medicine is expired!</p>` : ''}
    <button class="delete-button"> Delete Button</button>
    `;
    card.querySelector('.delete-button').addEventListener('click',() =>{
        card.remove();
        listItem.remove();
    })

    medicineList.appendChild(card);
    const listItem = document.createElement('li');
    listItem.innerHTML=`
    <label>
    <input type = "checkbox" />
    ${medName} (${medType})-Qty:${medQty}
    </label>
    `;

    listItem.querySelector('input').addEventListener('change',function(){
        if(this.checked){
            listItem.style.textDecoration='line-through';
            listItem.style.opacity='0.6';
        }else{
            listItem.style.textDecoration='none';
            listItem.style.opacity='1.0';
        }
    });

    
    checklist.appendChild(listItem);
    form.reset();

   
    });
     const filter = document.getElementById('filter');
    filter.addEventListener('change',()=>{
        const selectedType= filter.value;
        const cards= document.querySelector('.medicine-card');
        card.forEach(card => {
            const type = card.getAttribute('data-type')
        if(selectedType == 'All' || selectedType== type){
            card.style.display='block';
        }else{
            card.style.display='none';
        }
        });

});