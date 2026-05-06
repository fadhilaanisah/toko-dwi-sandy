/* DATA */
let products={
"Kebutuhan Harian":[
{name:"Beras",price:60000,img:"https://picsum.photos/400?1",category:"Kebutuhan Harian",description:"Beras berkualitas premium, putih bersih, cocok untuk nasi putih.",stock:50},
{name:"Gula",price:15000,img:"https://picsum.photos/400?2",category:"Kebutuhan Harian",description:"Gula pasir putih halus, kemasan 1kg.",stock:30},
{name:"Minyak",price:20000,img:"https://picsum.photos/400?3",category:"Kebutuhan Harian",description:"Minyak goreng murni, kemasan 1 liter.",stock:25},
{name:"Telur",price:27000,img:"https://picsum.photos/400?4",category:"Kebutuhan Harian",description:"Telur ayam segar, isi 10 butir.",stock:15},
{name:"Garam",price:5000,img:"https://picsum.photos/400?5",category:"Kebutuhan Harian",description:"Garam dapur putih halus, kemasan 250g.",stock:40}
],
"Makanan Ringan":[
{name:"Chitato",price:10000,img:"https://picsum.photos/400?6",category:"Makanan Ringan",description:"Snack keripik kentang dengan rasa barbeque.",stock:20},
{name:"Wafer",price:8000,img:"https://picsum.photos/400?7",category:"Makanan Ringan",description:"Wafer coklat lezat dengan filling kental.",stock:35},
{name:"Biskuit",price:12000,img:"https://picsum.photos/400?8",category:"Makanan Ringan",description:"Biskuit gandum untuk camilan sehat.",stock:28},
{name:"Permen",price:5000,img:"https://picsum.photos/400?9",category:"Makanan Ringan",description:"Permen keras berbagai rasa, isi 100g.",stock:50},
{name:"Coklat",price:15000,img:"https://picsum.photos/400?10",category:"Makanan Ringan",description:"Coklat premium isi kacang mete.",stock:18}
],
"Rumah Tangga":[
{name:"Sabun Cuci",price:12000,img:"https://picsum.photos/400?11",category:"Rumah Tangga",description:"Sabun cuci piring cair dengan busa banyak.",stock:22},
{name:"Sapu",price:25000,img:"https://picsum.photos/400?12",category:"Rumah Tangga",description:"Sapu ijuk kuat dan tahan lama.",stock:10},
{name:"Pel",price:30000,img:"https://picsum.photos/400?13",category:"Rumah Tangga",description:"Pel lantai dengan bulu halus dan kain sekali pakai.",stock:8},
{name:"Tissue",price:9000,img:"https://picsum.photos/400?14",category:"Rumah Tangga",description:"Tissue gulung lembut, isi 2 roll.",stock:45},
{name:"Sikat",price:7000,img:"https://picsum.photos/400?15",category:"Rumah Tangga",description:"Sikat pembersih dengan pegangan plastik.",stock:30}
],
"Perawatan":[
{name:"Shampoo",price:20000,img:"https://picsum.photos/400?16",category:"Perawatan",description:"Shampoo anti ketombe dengan aroma segar.",stock:15},
{name:"Sabun Mandi",price:8000,img:"https://picsum.photos/400?17",category:"Perawatan",description:"Sabun mandi batang dengan ekstrak buah.",stock:40},
{name:"Pasta Gigi",price:9000,img:"https://picsum.photos/400?18",category:"Perawatan",description:"Pasta gigi pencerah dengan fluoride.",stock:35},
{name:"Lotion",price:25000,img:"https://picsum.photos/400?19",category:"Perawatan",description:"Lotion tubuh pelembab untuk kulit kering.",stock:12},
{name:"Masker",price:15000,img:"https://picsum.photos/400?20",category:"Perawatan",description:"Masker wajah pemutih dengan beras dan madu.",stock:20}
],
"Lainnya":[
{name:"Pulsa",price:50000,img:"https://picsum.photos/400?21",category:"Lainnya",description:"Voucher pulsa digital untuk semua operator.",stock:100},
{name:"Gas",price:18000,img:"https://picsum.photos/400?22",category:"Lainnya",description:"Gas elpiji kemasan 3kg.",stock:5},
{name:"Air Galon",price:20000,img:"https://picsum.photos/400?23",category:"Lainnya",description:"Air mineral galon 19 liter.",stock:12},
{name:"Es Batu",price:5000,img:"https://picsum.photos/400?24",category:"Lainnya",description:"Es batu per kg, segar dari pabrik.",stock:25},
{name:"Korek",price:3000,img:"https://picsum.photos/400?25",category:"Lainnya",description:"Korek api dan korek gas praktis.",stock:60}
]
};

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let users = JSON.parse(localStorage.getItem("users")) || [];
let detailQuantity = 1;
let currentProduct = null;
let selectedPayment = "cash";
let currentAuthMode = "customer";
let isAdminLoggedIn = false;
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
let isLogin=true;

function saveData(){
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("orders", JSON.stringify(orders));
  localStorage.setItem("favorites", JSON.stringify(favorites));
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
}

function showToast(text){
  let notif = document.getElementById('notif');
  if(notif){
    notif.innerText=text;
    notif.classList.remove("hidden");
    setTimeout(()=>notif.classList.add("hidden"),1800);
  }
}

/* DARK MODE */
function applyTheme(){
  let themeBtn = document.getElementById('themeBtn');
  if(localStorage.getItem("darkMode") === "true"){
    document.body.classList.add("dark");
    if(themeBtn) themeBtn.innerText="☀️";
  }else{
    document.body.classList.remove("dark");
    if(themeBtn) themeBtn.innerText="🌙";
  }
}
function toggleDarkMode(){
  const isDark = !document.body.classList.contains("dark");
  localStorage.setItem("darkMode", isDark);
  applyTheme();
  showToast(isDark ? "🌙 Night mode aktif" : "☀️ Light mode aktif");
}
applyTheme();

/* SIDEBAR */
function openSidebar(){
  let sidebar = document.getElementById('sidebar');
  let overlay = document.getElementById('overlay');
  if(sidebar) sidebar.classList.add("show");
  if(overlay) overlay.classList.add("show");
}
function closeSidebar(){
  let sidebar = document.getElementById('sidebar');
  let overlay = document.getElementById('overlay');
  if(sidebar) sidebar.classList.remove("show");
  if(overlay) overlay.classList.remove("show");
}

/* LOGIN */
function openLogin(){
  let loginModal = document.getElementById('loginModal');
  if(loginModal) loginModal.classList.add("show");
}
function closeLogin(){
  let loginModal = document.getElementById('loginModal');
  if(loginModal) loginModal.classList.remove("show");
  currentAuthMode="customer";
  setAuthMode("customer");
}
function setAuthMode(mode){
  currentAuthMode=mode;
  document.querySelectorAll(".auth-tab-btn").forEach(btn=>btn.classList.remove("active"));
  document.querySelectorAll("#customerAuth,#adminAuth").forEach(el=>el.classList.add("hidden"));
  
  let formTitle = document.getElementById('formTitle');
  let customerAuth = document.getElementById('customerAuth');
  let adminAuth = document.getElementById('adminAuth');
  
  if(mode==="customer"){
    document.querySelectorAll(".auth-tab-btn")[0].classList.add("active");
    if(customerAuth) customerAuth.classList.remove("hidden");
    if(formTitle) formTitle.innerText=isLogin?"Login Pelanggan":"Daftar Akun";
  }else{
    document.querySelectorAll(".auth-tab-btn")[1].classList.add("active");
    if(adminAuth) adminAuth.classList.remove("hidden");
    if(formTitle) formTitle.innerText="Login Admin";
  }
}
function toggleAuth(){
  if(currentAuthMode==="customer"){
    isLogin=!isLogin;
    let formTitle = document.getElementById('formTitle');
    let switchBtn = document.getElementById('switchBtn');
    let switchText = document.getElementById('switchText');
    let username = document.getElementById('username');
    if(formTitle) formTitle.innerText=isLogin?"Login Pelanggan":"Daftar Akun";
    if(switchBtn) switchBtn.innerText=isLogin?"Daftar":"Login";
    if(switchText) switchText.innerText=isLogin?"Belum punya akun?":"Sudah punya akun?";
    if(username) username.classList.toggle("hidden");
  }
}
function submitAuth(type){
  let email = document.getElementById('email');
  let password = document.getElementById('password');
  let username = document.getElementById('username');
  let adminEmail = document.getElementById('adminEmail');
  let adminPassword = document.getElementById('adminPassword');
  
  if(type==="admin"){
    let adminMail=adminEmail.value.trim();
    let adminPass=adminPassword.value.trim();
    if(!adminMail||!adminPass){alert("Lengkapi data admin!");return;}
    if(adminMail==="fadhilaanisah@gmail.com"&&adminPass==="dhila2006"){
      isAdminLoggedIn=true;
      currentUser=null;
      saveData();
      updateUserMenu();
      showToast("✅ Login admin berhasil!");
      closeLogin();
      // Redirect to admin page if not already there
      if(!document.getElementById('adminPage')){
        window.location.href = 'admin.html';
      } else {
        showAdmin();
      }
    }else{
      alert("Email atau password admin salah!");
    }
    adminEmail.value="";adminPassword.value="";
  }else{
    let mail=email.value.trim();
    let pass=password.value.trim();
    let user=username.value.trim();
    if(!mail||!pass||(!isLogin&&!user)){alert("Lengkapi data!");return;}
    if(isLogin){
      let found=users.find(u=>u.mail==mail&&u.pass==pass);
      if(found){
        currentUser={mail:found.mail,user:found.user};
        isAdminLoggedIn=false;
        saveData();
        updateUserMenu();
        showToast("✅ Login berhasil, halo "+found.user);
        closeLogin();
      }else{
        alert("Email / password salah");
      }
    }else{
      let exist=users.find(u=>u.mail==mail);
      if(exist){alert("Email sudah terdaftar");return;}
      users.push({mail:mail,pass:pass,user:user});
      currentUser={mail:mail,user:user};
      isAdminLoggedIn=false;
      saveData();
      updateUserMenu();
      showToast("✅ Daftar berhasil, selamat datang "+user);
      toggleAuth();
      isLogin=true;
    }
    email.value="";password.value="";username.value="";
  }
}
function updateUserMenu(){
  let loginBtn = document.getElementById('loginBtn');
  let userMenuBtn = document.getElementById('userMenuBtn');
  let adminMenuBtn = document.getElementById('adminMenuBtn');
  let userAvatar = document.getElementById('userAvatar');
  let adminAvatar = document.getElementById('adminAvatar');
  let dropdownUsername = document.getElementById('dropdownUsername');
  let dropdownEmail = document.getElementById('dropdownEmail');
  let adminDropdownUsername = document.getElementById('adminDropdownUsername');
  
  if(isAdminLoggedIn){
    if(loginBtn) loginBtn.classList.add("hidden");
    if(userMenuBtn) userMenuBtn.classList.add("hidden");
    if(adminMenuBtn) adminMenuBtn.classList.remove("hidden");
    if(adminAvatar) adminAvatar.innerText="A";
    if(adminDropdownUsername) adminDropdownUsername.innerText="Admin";
  }else if(currentUser){
    if(loginBtn) loginBtn.classList.add("hidden");
    if(userMenuBtn) userMenuBtn.classList.remove("hidden");
    if(adminMenuBtn) adminMenuBtn.classList.add("hidden");
    let initial=currentUser.user.charAt(0).toUpperCase();
    if(userAvatar) userAvatar.innerText=initial;
    if(dropdownUsername) dropdownUsername.innerText=currentUser.user;
    if(dropdownEmail) dropdownEmail.innerText=currentUser.mail;
  }else{
    if(loginBtn) loginBtn.classList.remove("hidden");
    if(userMenuBtn) userMenuBtn.classList.add("hidden");
    if(adminMenuBtn) adminMenuBtn.classList.add("hidden");
  }
}
function toggleUserDropdown(){
  let userDropdown = document.getElementById('userDropdown');
  if(userDropdown) userDropdown.classList.toggle("show");
}
function closeUserDropdown(){
  let userDropdown = document.getElementById('userDropdown');
  if(userDropdown) userDropdown.classList.remove("show");
}
function logoutCustomer(){
  if(confirm("Logout dari akun "+currentUser.user+"?")){
    currentUser=null;
    saveData();
    updateUserMenu();
    closeUserDropdown();
    showToast("👋 Logout berhasil");
    window.location.href = 'index.html';
  }
}
function logoutAdmin(){
  if(confirm("Logout dari admin?")){
    isAdminLoggedIn=false;
    currentUser=null;
    saveData();
    updateUserMenu();
    closeAdminDropdown();
    showToast("👋 Logout admin");
    window.location.href = 'index.html';
  }
}
function toggleAdminDropdown(){
  let adminDropdown = document.getElementById('adminDropdown');
  if(adminDropdown) adminDropdown.classList.toggle("show");
}
function closeAdminDropdown(){
  let adminDropdown = document.getElementById('adminDropdown');
  if(adminDropdown) adminDropdown.classList.remove("show");
}
function showAdmin(){
  let adminPage = document.getElementById('adminPage');
  if(adminPage){
    adminPage.classList.remove("hidden");
    updateAdminStats();
    renderAdminProducts(getAllProducts());
    window.scrollTo({top:0,behavior:"smooth"});
  }else{
    window.location.href = 'admin.html';
  }
}
function switchAdminTab(tab){
  document.querySelectorAll(".admin-section").forEach(s=>s.classList.remove("show"));
  document.querySelectorAll(".admin-tab").forEach(b=>b.classList.remove("active"));
  
  let dashboardTab = document.getElementById('dashboardTab');
  let productsTab = document.getElementById('productsTab');
  let addTab = document.getElementById('addTab');
  
  if(tab==="dashboard"){
    if(dashboardTab) dashboardTab.classList.add("show");
  }else if(tab==="products"){
    if(productsTab) productsTab.classList.add("show");
    renderAdminProducts(getAllProducts());
  }else if(tab==="add"){
    if(addTab) addTab.classList.add("show");
  }
  document.querySelector(`.admin-tab:nth-child(${tab==="dashboard"?1:tab==="products"?2:3})`).classList.add("active");
}
function updateAdminStats(){
  let allProds=getAllProducts();
  let totalStock=allProds.reduce((sum,p)=>sum+p.stock,0);
  let catCount=Object.keys(products).length;
  
  let totalProducts = document.getElementById("totalProducts");
  let totalStockEl = document.getElementById("totalStock");
  let totalOrders = document.getElementById("totalOrders");
  let totalCategories = document.getElementById("totalCategories");
  
  if(totalProducts) totalProducts.innerText=allProds.length;
  if(totalStockEl) totalStockEl.innerText=totalStock;
  if(totalOrders) totalOrders.innerText=orders.length;
  if(totalCategories) totalCategories.innerText=catCount;
}
function renderAdminProducts(prods){
  let adminProductList = document.getElementById('adminProductList');
  if(!adminProductList) return;
  
  let html="";
  prods.forEach(p=>{
    html+=`<tr>
      <td><b>${p.name}</b></td>
      <td>${p.category}</td>
      <td>Rp ${p.price.toLocaleString()}</td>
      <td><input type="number" value="${p.stock}" onchange="updateProductStock('${p.name}','${p.category}',this.value)" style="width:70px;padding:6px;border-radius:8px;border:1px solid var(--border);background:var(--bg-soft);color:var(--text);outline:none" min="0"></td>
      <td>
        <button class="action-btn edit-btn" onclick="editProduct('${p.name}','${p.category}')">✏️ Edit</button>
        <button class="action-btn delete-btn" onclick="deleteProduct('${p.name}','${p.category}')">🗑️ Hapus</button>
      </td>
    </tr>`;
  });
  adminProductList.innerHTML=html||"<tr><td colspan='5' style='text-align:center;padding:20px;color:var(--muted)'>Tidak ada produk</td></tr>";
}
function filterAdminProducts(){
  let adminSearch = document.getElementById('adminSearch');
  if(!adminSearch) return;
  let keyword=adminSearch.value.toLowerCase();
  let filtered=getAllProducts().filter(p=>p.name.toLowerCase().includes(keyword)||p.category.toLowerCase().includes(keyword));
  renderAdminProducts(filtered);
}
function updateProductStock(name,cat,newStock){
  let product=getProduct(name,cat);
  if(product){
    product.stock=parseInt(newStock)||0;
    saveData();
    showToast("✅ Stok "+name+" diperbarui");
    renderAdminProducts(getAllProducts());
  }
}
function editProduct(name,cat){
  let product=getProduct(name,cat);
  if(product){
    switchAdminTab("add");
    document.getElementById("newProductName").value=product.name;
    document.getElementById("newProductPrice").value=product.price;
    document.getElementById("newProductStock").value=product.stock;
    document.getElementById("newProductCategory").value=product.category;
    document.getElementById("newProductDesc").value=product.description;
    document.getElementById("newProductImg").value=product.img;
    
    let oldName=name;let oldCat=cat;
    let submitBtn=document.querySelector(".submit-btn");
    submitBtn.innerText="💾 Update Produk";
    submitBtn.onclick=function(){
      let updated={
        name:document.getElementById("newProductName").value,
        price:parseInt(document.getElementById("newProductPrice").value),
        stock:parseInt(document.getElementById("newProductStock").value),
        category:document.getElementById("newProductCategory").value,
        description:document.getElementById("newProductDesc").value,
        img:document.getElementById("newProductImg").value
      };
      let idx=products[oldCat].findIndex(p=>p.name===oldName);
      if(idx>-1){
        products[oldCat].splice(idx,1);
        if(!products[updated.category]) products[updated.category]=[];
        products[updated.category].push(updated);
        saveData();
        showToast("✅ Produk diupdate");
        resetProductForm();
        switchAdminTab("products");
      }
    };
  }
}
function deleteProduct(name,cat){
  if(confirm("Hapus produk "+name+"?")){
    let idx=products[cat].findIndex(p=>p.name===name);
    if(idx>-1){
      products[cat].splice(idx,1);
      saveData();
      showToast("🗑️ Produk dihapus");
      renderAdminProducts(getAllProducts());
      loadAll();
    }
  }
}
function addNewProduct(){
  let name=document.getElementById("newProductName").value.trim();
  let price=parseInt(document.getElementById("newProductPrice").value);
  let stock=parseInt(document.getElementById("newProductStock").value);
  let cat=document.getElementById("newProductCategory").value;
  let desc=document.getElementById("newProductDesc").value.trim();
  let img=document.getElementById("newProductImg").value.trim();
  
  if(!name||!price||!stock||!cat||!desc||!img){alert("Lengkapi semua data!");return;}
  
  let newProd={name:name,price:price,stock:stock,category:cat,description:desc,img:img};
  if(!products[cat]) products[cat]=[];
  products[cat].push(newProd);
  saveData();
  showToast("✅ Produk baru ditambahkan");
  resetProductForm();
  switchAdminTab("products");
  loadAll();
}
function resetProductForm(){
  document.getElementById("newProductName").value="";
  document.getElementById("newProductPrice").value="";
  document.getElementById("newProductStock").value="";
  document.getElementById("newProductCategory").value="";
  document.getElementById("newProductDesc").value="";
  document.getElementById("newProductImg").value="";
  let submitBtn=document.querySelector(".submit-btn");
  submitBtn.innerText="✓ Tambah Produk";
  submitBtn.onclick=function(){addNewProduct();};
}

/* PAGE NAVIGATION */
function navigateTo(page) {
  window.location.href = page;
}

/* PRODUCT HELPERS */
function getAllProducts(){let arr=[];for(let k in products){products[k].forEach(p=>arr.push(p));}return arr;}
function card(p){
  let fav = favorites.includes(p.name) ? "active" : "";
  let badge = p.stock <= 10 ? `<div class="badge">Stok Terbatas</div>` : (Math.random()>0.75 ? `<div class="badge">Promo</div>` : "");
  return `<div class="product" onclick="showDetail('${p.name}','${p.category}')">
    ${badge}
    <div class="stock-pill">Stok ${p.stock}</div>
    <img src="${p.img}" alt="${p.name}">
    <h4>${p.name}</h4>
    <p class="price">Rp ${p.price.toLocaleString()}</p>
    <p class="meta">${p.category}</p>
    <div class="product-actions">
      <button class="add-btn" onclick="event.stopPropagation(); add('${p.name}',${p.price})">+ Keranjang</button>
      <button class="wish-btn ${fav}" onclick="event.stopPropagation(); toggleFavorite('${p.name}')">♥️</button>
    </div>
  </div>`;
}
function renderProducts(arr){
  let productList = document.getElementById('productList');
  if(!productList) return;
  productList.innerHTML="";
  if(arr.length===0){productList.innerHTML=`<div class="empty-state">Produk tidak ditemukan.</div>`;return;}
  arr.forEach(p=>productList.innerHTML+=card(p));
}
function loadAll(){
  document.querySelectorAll(".cat,.sortbar button").forEach(c=>c.classList.remove("active"));
  let searchInput = document.getElementById('searchInput');
  if(searchInput) searchInput.value="";
  renderProducts(getAllProducts());
}
function showProduk(kat,el){
  document.querySelectorAll(".cat").forEach(c=>c.classList.remove("active"));
  if(el) el.classList.add("active");
  renderProducts(products[kat]);
}
function searchItem(){
  let searchInput = document.getElementById('searchInput');
  if(!searchInput) return;
  let key=searchInput.value.toLowerCase();
  let arr=getAllProducts().filter(p=>p.name.toLowerCase().includes(key)||p.category.toLowerCase().includes(key));
  renderProducts(arr);
}
function sortHarga(type,btn){
  let arr=getAllProducts();
  arr.sort((a,b)=>type=="asc"?a.price-b.price:b.price-a.price);
  renderProducts(arr);
  document.querySelectorAll(".sortbar button").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
}
function filterStock(btn){
  renderProducts(getAllProducts().filter(p=>p.stock>0));
  document.querySelectorAll(".sortbar button").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
}
function toggleFavorite(name){
  if(favorites.includes(name)){
    favorites=favorites.filter(f=>f!==name);
    showToast("🤍 Dihapus dari favorit");
  }else{
    favorites.push(name);
    showToast("❤️ Ditambahkan ke favorit");
  }
  saveData();
  searchItem();
}
function showFavorites(){
  let arr=getAllProducts().filter(p=>favorites.includes(p.name));
  renderProducts(arr);
  showToast("❤️ Menampilkan produk favorit");
}

/* CART */
function add(name,price){
  let existing = cart.find(item => item.name === name && item.price === price);
  if(existing){existing.quantity++;}else{cart.push({name, price, quantity:1});}
  saveData();updateCartCount();renderCart();showToast("✔ Produk ditambahkan");
}
function updateCartCount(){
  let cartCount = document.getElementById('cartCount');
  if(cartCount) cartCount.innerText = cart.reduce((sum,item)=>sum+item.quantity,0);
}
function renderCart(){
  let cartItems = document.getElementById('cartItems');
  if(!cartItems) return;
  cartItems.innerHTML="";
  let total=0;
  let totalHarga = document.getElementById('totalHarga');
  let subtotalHarga = document.getElementById('subtotalHarga');
  
  if(cart.length===0){
    cartItems.innerHTML=`<div class="empty-state">Keranjang masih kosong. Yuk mulai belanja.</div>`;
    if(totalHarga) totalHarga.innerText="0";
    if(subtotalHarga) subtotalHarga.innerText="0";
    return;
  }
  cart.forEach((item,index)=>{
    let itemTotal=item.price*item.quantity; total+=itemTotal;
    cartItems.innerHTML+=`<div class="cart-item">
      <div class="cart-item-info">
        <p>${item.name}</p>
        <p>Rp ${item.price.toLocaleString()} / item</p>
      </div>
      <div class="cart-item-quantity">
        <button class="quantity-btn" onclick="changeQuantity(${index},-1)">−</button>
        <span class="quantity-display">${item.quantity}</span>
        <button class="quantity-btn" onclick="changeQuantity(${index},1)">+</button>
      </div>
      <div class="cart-item-total">Rp ${itemTotal.toLocaleString()}</div>
      <button class="remove-btn" onclick="removeFromCart(${index})">Hapus</button>
    </div>`;
  });
  if(totalHarga) totalHarga.innerText=total.toLocaleString();
  if(subtotalHarga) subtotalHarga.innerText=total.toLocaleString();
}
function changeQuantity(index,change){
  if(index<0 || index>=cart.length)return;
  cart[index].quantity += change;
  if(cart[index].quantity<1)cart.splice(index,1);
  saveData();updateCartCount();renderCart();
}
function removeFromCart(index){cart.splice(index,1);saveData();updateCartCount();renderCart();showToast("🗑️ Produk dihapus");}
function clearCart(){
  if(cart.length===0){showToast("Keranjang sudah kosong");return;}
  if(confirm("Kosongkan semua isi keranjang?")){
    cart=[];saveData();updateCartCount();renderCart();showToast("🗑️ Keranjang dikosongkan");
  }
}
function setPaymentMethod(method){
  selectedPayment=method;
  let payCash = document.getElementById('payCash');
  let payQris = document.getElementById('payQris');
  let paymentNote = document.getElementById('paymentNote');
  
  if(payCash) payCash.classList.toggle("active",method==="cash");
  if(payQris) payQris.classList.toggle("active",method==="qris");
  if(paymentNote) paymentNote.innerHTML = method==="qris" ? "Pembayaran QRIS dipilih. Setelah checkout, pesanan akan menampilkan area QRIS untuk proses pembayaran." : "Pembayaran cash dilakukan saat pesanan diterima.";
}

function checkoutCart(){
  if(cart.length===0){alert("Keranjang masih kosong!");return;}
  sessionStorage.setItem('paymentMethod', selectedPayment);
  navigateTo('checkout.html');
}

/* DETAIL PRODUK */
function getProduct(name,category){return products[category]?.find(p=>p.name===name);}
function showDetail(name,category){
  let product=getProduct(name,category); 
  if(!product)return;
  currentProduct=product; 
  detailQuantity=1; 
  updateDetailQuantityDisplay();
  
  let detailName = document.getElementById('detailName');
  let detailPrice = document.getElementById('detailPrice');
  let detailImg = document.getElementById('detailImg');
  let detailCategory = document.getElementById('detailCategory');
  let detailDescription = document.getElementById('detailDescription');
  let detailStock = document.getElementById('detailStock');
  let detailModal = document.getElementById('detailModal');
  
  if(detailName) detailName.innerText=product.name;
  if(detailPrice) detailPrice.innerText="Rp "+product.price.toLocaleString();
  if(detailImg) detailImg.src=product.img;
  if(detailCategory) detailCategory.innerText=product.category;
  if(detailDescription) detailDescription.innerText=product.description;
  if(detailStock) detailStock.innerText=product.stock>0?`${product.stock} Tersedia`:"Stok Habis";
  if(detailModal) detailModal.classList.add("show");
}
function closeDetail(){
  let detailModal = document.getElementById('detailModal');
  if(detailModal) detailModal.classList.remove("show");
  currentProduct=null;
  detailQuantity=1;
}
function updateDetailQuantityDisplay(){
  let detailQtyDisplay = document.getElementById('detailQtyDisplay');
  if(detailQtyDisplay) detailQtyDisplay.innerText=detailQuantity;
}
function addFromDetail(){
  if(!currentProduct)return;
  if(detailQuantity<1)detailQuantity=1;
  for(let i=0;i<detailQuantity;i++){add(currentProduct.name,currentProduct.price);}
  closeDetail();
}

/* STATUS PESANAN */
const statusSteps=["Pesanan Diproses","Pesanan Di-pickup","Pesanan Dalam Perjalanan","Pesanan Telah Diterima"];
function renderCheckout(paymentMethod){
  let checkoutOrder = document.getElementById('checkoutOrder');
  if(!checkoutOrder) return;
  
  let total=cart.reduce((sum,item)=>sum+(item.price*item.quantity),0);
  let items=cart;
  let itemsHtml=items.map(i=>`<li><span class="item-name">${i.name} <b style="color:var(--muted)">(x${i.quantity})</b></span><span class="item-price">Rp ${(i.price*i.quantity).toLocaleString()}</span></li>`).join("");
  
  let paymentContent="";
  if(paymentMethod==="cash"){
    paymentContent=`
      <div class="cash-box">
        <b style="font-size:18px;color:var(--primary-2)">💵 Bayaran Cash</b>
        <div class="cash-note">Pembayaran dilakukan saat barang diterima<br>Total: <b style="color:var(--primary-2)">Rp ${total.toLocaleString()}</b></div>
      </div>
    `;
  }else{
    paymentContent=`
      <div class="qris-display">
        <b style="font-size:16px;color:var(--primary-2)">📱 Scan QRIS untuk Pembayaran</b>
        <div class="qris-image"></div>
        <div class="qris-label">Tunjukkan atau scan QR Code ini kepada kasir untuk melanjutkan pembayaran</div>
      </div>
    `;
  }

  checkoutOrder.innerHTML=`
    <div class="checkout-header">
      <h3>Ringkasan Pesanan</h3>
      <p style="color:var(--muted);font-size:14px;margin-top:6px">Pesanan akan diproses setelah pembayaran dikonfirmasi</p>
    </div>

    <div class="checkout-card">
      <h4>Detail Pesanan</h4>
      <ul class="item-list">
        ${itemsHtml}
        <li style="border-top:2px solid var(--primary-2);padding-top:12px;margin-top:12px">
          <span class="item-name" style="font-weight:900;color:var(--primary-2)">Total Pembayaran</span>
          <span class="item-price" style="font-size:16px">Rp ${total.toLocaleString()}</span>
        </li>
      </ul>
    </div>

    <div class="payment-section">
      <h4 style="margin-bottom:8px;color:var(--primary-2)">Metode Pembayaran</h4>
      ${paymentContent}
    </div>

    <div class="checkout-card">
      <h4>🚚 Status Pesanan</h4>
      <div class="order-status" style="margin:16px 0 0 0">
        ${statusSteps.map((step,idx)=>`<div class="status-step">
          <div class="status-circle ${idx===0?'active':''}">${idx+1}</div>
          <div class="status-label">${step}</div>
        </div>`).join('')}
      </div>
    </div>

    <button class="confirm-btn" onclick="finalizeCheckout('${paymentMethod}')">✓ Konfirmasi Pembayaran</button>
    <button class="clear-btn" style="width:100%;margin-top:8px;padding:14px;" onclick="navigateTo('keranjang.html')">← Kembali ke Keranjang</button>
  `;
}
function finalizeCheckout(paymentMethod){
  let total=cart.reduce((sum,item)=>sum+(item.price*item.quantity),0);
  let items=JSON.parse(JSON.stringify(cart));
  createOrder(total,items,paymentMethod);
  cart=[];saveData();updateCartCount();renderCart();
  showToast(paymentMethod==="qris"?"✔ Pesanan berhasil · Silakan scan QRIS":"✔ Pesanan berhasil · Bayar di tempat");
  setTimeout(()=>navigateTo('pesanan.html'),1500);
}
function createOrder(total,items,paymentMethod){
  let orderId="ORD-"+Date.now();
  let paymentLabel=paymentMethod==="qris"?"QRIS":"Cash";
  let paymentStatus=paymentMethod==="qris"?"Menunggu pembayaran QRIS":"Bayar di tempat";
  let order={id:orderId,items:items,total:total,statusIndex:0,date:new Date().toLocaleDateString('id-ID'),paymentMethod:paymentMethod,paymentLabel:paymentLabel,paymentStatus:paymentStatus};
  orders.push(order);saveData();simulateOrderProgress(orderId);
}
function simulateOrderProgress(orderId){
  let interval=setInterval(()=>{
    let order=orders.find(o=>o.id===orderId);
    if(!order){clearInterval(interval);return;}
    if(order.statusIndex<statusSteps.length-1){order.statusIndex++;saveData();renderOrders();}
    else{clearInterval(interval);}
  },4000);
}
function renderOrders(){
  let orderList = document.getElementById('orderList');
  if(!orderList) return;
  
  if(orders.length===0){orderList.innerHTML=`<div class="empty-state">Belum ada pesanan.</div>`;return;}
  orderList.innerHTML="";
  [...orders].reverse().forEach(order=>{
    let status=statusSteps[order.statusIndex];
    let items=order.items.map(i=>`<li>${i.name} (x${i.quantity}) - Rp ${(i.price*i.quantity).toLocaleString()}</li>`).join("");
    
    let paymentDisplay="";
    if(order.paymentMethod==="qris"){
      paymentDisplay=`<div class="qris-box"><b>📱 Scan QRIS untuk pembayaran</b><p style="color:var(--muted);font-size:13px;margin-top:4px">Tunjukkan/scan kode ini saat pembayaran. Ini placeholder QRIS, bisa diganti dengan gambar QRIS asli toko.</p><div class="qris-fake"></div></div>`;
    }else{
      paymentDisplay=`<div class="qris-box" style="border-color:var(--accent);background:rgba(200,155,60,.08)"><b style="color:var(--accent)">💵 Bayaran Cash</b><p style="color:var(--muted);font-size:13px;margin-top:4px">Pembayaran dilakukan saat barang diterima. Pastikan uang disiapkan sesuai dengan total pesanan.</p></div>`;
    }

    orderList.innerHTML += `<div class="order-card">
      <h3>${order.id}</h3>
      <p style="color:var(--muted);font-size:14px;margin-top:5px">Tanggal: ${order.date}</p>
      <p style="margin-top:8px">Status: <b style="color:var(--primary-2)">${status}</b></p>
      <div class="order-payment">${order.paymentMethod==="qris"?"📱":"💵"} Pembayaran: ${order.paymentLabel||"Cash"} · ${order.paymentStatus||"Bayar di tempat"}</div>
      ${paymentDisplay}
      <div class="order-status">
        ${statusSteps.map((step,idx)=>`<div class="status-step">
          <div class="status-circle ${idx<=order.statusIndex?'active':''}">${idx+1}</div>
          <div class="status-label">${step}</div>
        </div>`).join('')}
      </div>
      <p><b>Total: Rp ${order.total.toLocaleString()}</b></p>
      <ul style="margin:12px 0 0 20px;line-height:1.7;color:var(--muted)">${items}</ul>
    </div>`;
  });
}

/* SCROLL BUTTON */
window.addEventListener("scroll",()=>{
  let scrollTopBtn = document.getElementById('scrollTopBtn');
  if(scrollTopBtn){
    if(window.scrollY>350)scrollTopBtn.classList.add("show");
    else scrollTopBtn.classList.remove("show");
  }
});

/* CLOSE DROPDOWN ON OUTSIDE CLICK */
document.addEventListener("click",(e)=>{
  let userMenuBtn = document.getElementById('userMenuBtn');
  let adminMenuBtn = document.getElementById('adminMenuBtn');
  if(userMenuBtn && !userMenuBtn.contains(e.target)){
    closeUserDropdown();
  }
  if(adminMenuBtn && !adminMenuBtn.contains(e.target)){
    closeAdminDropdown();
  }
});

/* INIT */
if(localStorage.getItem("products")){
  products=JSON.parse(localStorage.getItem("products"));
}
loadAll();
updateCartCount();
renderCart();
renderOrders();
updateUserMenu();
