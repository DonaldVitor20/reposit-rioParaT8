document.addEventListener('DOMContentLoaded', () => {
    const productFormSection = document.getElementById('productFormSection');
    const supplierFormSection = document.getElementById('supplierFormSection');
    const viewProductsSection = document.getElementById('viewProductsSection');
    const viewSuppliersSection = document.getElementById('viewSuppliersSection');

    const viewProductsBtn = document.getElementById('viewProductsBtn');
    const addProductBtn = document.getElementById('addProductBtn');
    const viewSuppliersBtn = document.getElementById('viewSuppliersBtn');
    const addSupplierBtn = document.getElementById('addSupplierBtn');

    const productForm = document.getElementById('productForm');
    const supplierForm = document.getElementById('supplierForm');

    const productsTableBody = document.querySelector('#productsTable tbody');
    const suppliersTableBody = document.querySelector('#suppliersTable tbody');

    // Alternar visibilidade das seções
    viewProductsBtn.addEventListener('click', () => toggleSection(viewProductsSection));
    addProductBtn.addEventListener('click', () => toggleSection(productFormSection));
    viewSuppliersBtn.addEventListener('click', () => toggleSection(viewSuppliersSection));
    addSupplierBtn.addEventListener('click', () => toggleSection(supplierFormSection));

    // Função para alternar visibilidade das seções
    function toggleSection(section) {
        [productFormSection, supplierFormSection, viewProductsSection, viewSuppliersSection].forEach(sec => sec.style.display = 'none');
        section.style.display = 'block';
        if (section === viewProductsSection) displayProducts();
        if (section === viewSuppliersSection) displaySuppliers();
    }

    // Salvar produto no LocalStorage
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const product = {
            code: document.getElementById('productCode').value,
            description: document.getElementById('productDescription').value,
            category: document.getElementById('productCategory').value,
            quantity: document.getElementById('productQuantity').value,
            unit: document.getElementById('unitOfMeasure').value,
            price: document.getElementById('purchasePrice').value,
            supplier: document.getElementById('productSupplier').value,
            entryDate: document.getElementById('entryDate').value,
            expiryDate: document.getElementById('expiryDate').value,
            location: document.getElementById('warehouseLocation').value,
        };
        saveData('products', product);
        productForm.reset();
    });

    // Salvar fornecedor no LocalStorage
    supplierForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const supplier = {
            name: document.getElementById('supplierName').value,
            cnpjCpf: document.getElementById('supplierCNPJCPF').value,
            phone: document.getElementById('supplierPhone').value,
            email: document.getElementById('supplierEmail').value,
            site: document.getElementById('supplierSite').value,
            rating: document.getElementById('supplierRating').value,
            discounts: document.getElementById('supplierDiscounts').value,
        };
        saveData('suppliers', supplier);
        supplierForm.reset();
    });

    // Função para salvar dados no LocalStorage
    function saveData(key, data) {
        const storedData = JSON.parse(localStorage.getItem(key)) || [];
        storedData.push(data);
        localStorage.setItem(key, JSON.stringify(storedData));
    }

    // Exibir produtos na tabela
    function displayProducts() {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        productsTableBody.innerHTML = '';
        products.forEach(product => {
            const row = productsTableBody.insertRow();
            row.insertCell(0).textContent = product.code;
            row.insertCell(1).textContent = product.description;
            row.insertCell(2).textContent = product.category;
            row.insertCell(3).textContent = product.quantity;
            row.insertCell(4).textContent = product.unit;
            row.insertCell(5).textContent = product.price;
            row.insertCell(6).textContent = product.supplier;
            row.insertCell(7).textContent = product.entryDate;
            row.insertCell(8).textContent = product.expiryDate;
            row.insertCell(9).textContent = product.location;
        });
    }

    // Exibir fornecedores na tabela
    function displaySuppliers() {
        const suppliers = JSON.parse(localStorage.getItem('suppliers')) || [];
        suppliersTableBody.innerHTML = '';
        suppliers.forEach(supplier => {
            const row = suppliersTableBody.insertRow();
            row.insertCell(0).textContent = supplier.name;
            row.insertCell(1).textContent = supplier.cnpjCpf;
            row.insertCell(2).textContent = supplier.phone;
            row.insertCell(3).textContent = supplier.email;
            row.insertCell(4).textContent = supplier.site;
            row.insertCell(5).textContent = supplier.rating;
            row.insertCell(6).textContent = supplier.discounts;
        });
    }
});
