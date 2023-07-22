$(document).ready(function() {
  // Initialize the selected date to the current date
  let currentDate = new Date();
  updateSelectedDate();
  fetchProductData();

  // Handle changes in the date picker
  $("#datePicker").on("change", function() {
    const selectedDate = new Date($(this).val());
    if (!isNaN(selectedDate)) {
      currentDate = selectedDate;
      updateSelectedDate();
    }
  });


  // Handle click event for the next button
  $("#nextBtn").on("click", function() {
    currentDate.setDate(currentDate.getDate() + 1);
    updateSelectedDate();
  });

  // Handle click event for the previous button
  $("#prevBtn").on("click", function() {
    currentDate.setDate(currentDate.getDate() - 1);
    updateSelectedDate();
  });  

  // Function to update the selected date display
  function updateSelectedDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    $("#datePicker").val(currentDate.toISOString().slice(0, 10)); // Update the date picker value
    $("#selectedDate").text(formattedDate);
  }

  // Function to fetch product data from the API
  function fetchProductData() {
    $.getJSON("https://dummyjson.com/products", function(data) {
      renderProductTable(data);
    });
  }

  // Function to dynamically render the product data in the table
  function renderProductTable(data) {
    const tbody = $("#mainTable tbody");
    tbody.empty();
    

    // Loop through the data and create table rows
    $.each(data.products, function(index, product) {
      const row = $("<tr>");
      row.append($("<td>").text(product.id));
      row.append($("<td>").text(product.title));
      row.append($("<td>").text(product.description));
      row.append($("<td>").text(product.price));
      row.append($("<td>").text(product.discountPercentage));
      row.append($("<td>").text(product.rating));

      // append
      tbody.append(row);
    });
  }

  const modal = $('#modal');
  const openModalBtn = $('#openModalBtn');
  const closeModalBtn = $('#closeModalBtn');

  // Function to open the modal
  function openModal() {
    console.log('open modal');
    modal.css('display', 'block');
  }

  // Function to close the modal
  function closeModal() {
    modal.css('display', 'none');
  }

  // Event listener for the open button
  openModalBtn.on('click', openModal);

  // Event listener for the close button
  closeModalBtn.on('click', closeModal);

  // Event listener to close the modal when clicking outside the content area
  $(window).on('click', function(event) {
    if (event.target === modal[0]) {
      closeModal();
    }
  });
});
