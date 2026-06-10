/* ── Config ── */
    const DB_BASE_URL = "http://api.login2explore.com:5577";
    const API_IML     = "/api/iml";
    const API_IRL     = "/api/irl";
    const CONN_TOKEN  = "";
    const DB_NAME     = "COLLEGE-DB";
    const REL_NAME    = "PROJECT-TABLE";

    let currentRecNo = null;

    /* ── On Load ── */
    $(document).ready(function () {
        initForm();
        $("#projectId").on("keydown", function (e) {
            if (e.key === "Enter") { e.preventDefault(); lookupProject(); }
        });
    });

    /* ── Init / Reset ── */
    function initForm() {
        $("#projectId,#projectName,#assignedTo,#assignmentDate,#deadline").val("");
        $("#projectId").prop("disabled", false);
        setFieldsDisabled(true);
        $("#btnSave,#btnUpdate,#btnReset").prop("disabled", true);
        $("#projectIdMsg").text("").removeClass("new-id existing-id");
        clearStatus();
        currentRecNo = null;
        $("#projectId").focus();
    }
    function resetForm() { initForm(); }
    function setFieldsDisabled(s) {
        $("#projectName,#assignedTo,#assignmentDate,#deadline").prop("disabled", s);
    }

    /* ── Lookup ── */
    function lookupProject() {
        var projectId = $("#projectId").val().trim();
        if (!projectId) {
            showStatus("Please enter a Project ID first.", "warning");
            $("#projectId").focus();
            return;
        }
        jQuery.ajaxSetup({ async: false });
        var result = executeCommand(createGETRequest(projectId), DB_BASE_URL, API_IRL);
        jQuery.ajaxSetup({ async: true });

        if (!result) {
            showStatus("Could not connect to the database.", "danger");
            return;
        }

        if (result.status === 400) {
            /* New record */
            currentRecNo = null;
            $("#projectIdMsg").text("✦ New").removeClass("existing-id").addClass("new-id");
            setFieldsDisabled(false);
            $("#btnSave,#btnReset").prop("disabled", false);
            $("#btnUpdate").prop("disabled", true);
            clearStatus();
            $("#projectName").focus();

        } else if (result.status === 200) {
            /* Existing record */
            var recData  = (typeof result.data === "string") ? JSON.parse(result.data) : result.data;
            currentRecNo = recData.rec_no;
            var rec      = recData.record || recData;

            $("#projectName").val(rec["Project-Name"]       || "");
            $("#assignedTo").val(rec["Assigned-To"]         || "");
            $("#assignmentDate").val(rec["Assignment-Date"] || "");
            $("#deadline").val(rec["Deadline"]              || "");

            $("#projectIdMsg").text("✦ Found").removeClass("new-id").addClass("existing-id");
            setFieldsDisabled(false);
            $("#projectId").prop("disabled", true);
            $("#btnUpdate,#btnReset").prop("disabled", false);
            $("#btnSave").prop("disabled", true);
            clearStatus();
            $("#projectName").focus();

        } else {
            showStatus("Unexpected response: " + JSON.stringify(result), "danger");
        }
    }

    /* ── Validate ── */
    function validateForm() {
        var fields = [
            { id: "#projectName",     label: "Project Name" },
            { id: "#assignedTo",      label: "Assigned To" },
            { id: "#assignmentDate",  label: "Assignment Date" },
            { id: "#deadline",        label: "Deadline" }
        ];
        for (var i = 0; i < fields.length; i++) {
            if (!$(fields[i].id).val().trim()) {
                showStatus(fields[i].label + " cannot be empty.", "danger");
                $(fields[i].id).focus();
                return null;
            }
        }
        return {
            "Project-ID":       $("#projectId").val().trim(),
            "Project-Name":     $("#projectName").val().trim(),
            "Assigned-To":      $("#assignedTo").val().trim(),
            "Assignment-Date":  $("#assignmentDate").val(),
            "Deadline":         $("#deadline").val()
        };
    }

    /* ── Save ── */
    function saveProject() {
        var data = validateForm();
        if (!data) return;
        jQuery.ajaxSetup({ async: false });
        var result = executeCommand(createPUTRequest(data), DB_BASE_URL, API_IML);
        jQuery.ajaxSetup({ async: true });
        if (result && result.status === 200) {
            showStatus("Project saved! (Project ID: " + data["Project-ID"] + ")", "success");
            setTimeout(resetForm, 1800);
        } else {
            showStatus("Save failed: " + (result ? result.message : "No response"), "danger");
        }
    }

    /* ── Update ── */
    function updateProject() {
        var data = validateForm();
        if (!data) return;
        if (!currentRecNo) { showStatus("Record number missing.", "danger"); return; }
        jQuery.ajaxSetup({ async: false });
        var result = executeCommand(createUPDATERequest(data, currentRecNo), DB_BASE_URL, API_IML);
        jQuery.ajaxSetup({ async: true });
        if (result && result.status === 200) {
            showStatus("Project updated! (Project ID: " + data["Project-ID"] + ")", "success");
            setTimeout(resetForm, 1800);
        } else {
            showStatus("Update failed: " + (result ? result.message : "No response"), "danger");
        }
    }

    /* ── Request Builders ── */
    function createGETRequest(projectId) {
        return JSON.stringify({
            token: CONN_TOKEN, cmd: "GET_BY_KEY",
            dbName: DB_NAME,   rel: REL_NAME,
            jsonStr: { "Project-ID": projectId }
        });
    }
    function createPUTRequest(data) {
        return JSON.stringify({
            token: CONN_TOKEN, cmd: "PUT",
            dbName: DB_NAME,   rel: REL_NAME,
            jsonStr: data
        });
    }
    function createUPDATERequest(data, recNo) {
        var js = {};
        js[recNo] = data;
        return JSON.stringify({
            token: CONN_TOKEN, cmd: "UPDATE",
            dbName: DB_NAME,   rel: REL_NAME,
            jsonStr: js
        });
    }

    /* ── AJAX ── */
    function executeCommand(reqString, baseUrl, endpoint) {
        var jsonObj;
        $.ajax({
            url: baseUrl + endpoint, type: "POST",
            data: reqString,         async: false,
            success: function (r) { jsonObj = (typeof r === "string") ? JSON.parse(r) : r; },
            error:   function (x) { try { jsonObj = JSON.parse(x.responseText); } catch(e) { jsonObj = null; } }
        });
        return jsonObj;
    }

    /* ── Status ── */
    function showStatus(msg, type) {
        var ic = { success:"✓", danger:"✗", warning:"⚠", info:"ℹ" };
        $("#statusBar").html('<div class="alert alert-' + type + '">' + (ic[type]||"") + " " + msg + "</div>");
    }
    function clearStatus() { $("#statusBar").html(""); }
