$(document).ready(function() {
    function getCurrentFeeStatus(studentId) {
        $.ajax({
            url: "http://localhost:8081/api/student/fee/" + studentId,
            method: "GET",
            success: function(data) {
                $('#currentFeeStatus').html(`
                    <p>Due Date: ${data.dueDate}</p>
                    <p>Status: ${data.status}</p>
                `);
            },
            error: function(error) {
                console.log(error);
                alert("Error fetching fee status");
            }
        });
    }

    function getFeeHistory(studentId) {
        $.ajax({
            url: `http://localhost:8081/api/student/fee/${studentId}/next-payment`,
            method: "GET",
            success: function(data) {
                let historyHtml = '';
                data.forEach(function(fee) {
                    historyHtml += `
                        <p>Date: ${fee.dueDate}, Status: ${fee.status}</p>
                    `;
                });
                $('#feeHistory').html(NextPaymentHtml);
            },
            error: function(error) {
                console.log(error);
                alert("Error fetching fee");
            }
        });
    }

    function getGrades(studentId) {
        $.ajax({
            url: "http://localhost:8081/api/student/grade/" + studentId,
            method: "GET",
            success: function(data) {
                let gradesHtml = '';
                data.forEach(function(grade) {
                    gradesHtml += `
                        <p>Subject: ${grade.subject}, Theoretical: ${grade.theoretical}, Practical: ${grade.practical}, Average: ${grade.average}</p>
                    `;
                });
                $('#grades').html(gradesHtml);
            },
            error: function(error) {
                console.log(error);
                alert("Error fetching grades");
            }
        });
    }

    $('#viewFeeStatusBtn').click(function() {
        const studentId = $('#studentId').val();
        getCurrentFeeStatus(studentId);
    });

    $('#viewFeeHistoryBtn').click(function() {
        const studentId = $('#studentId').val();
        getFeeHistory(studentId);
    });

    $('#viewGradesBtn').click(function() {
        const studentId = $('#studentId').val();
        getGrades(studentId);
    });
});
