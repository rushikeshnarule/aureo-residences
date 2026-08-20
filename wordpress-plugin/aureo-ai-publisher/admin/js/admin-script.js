
jQuery(document).ready(function ($) {
    var $banner = $('#aureo-status-banner');
    var $btnGenerate = $('#btn-generate-now');
    var $btnTest = $('#btn-test-key');
    var $btnClearLogs = $('#btn-clear-logs');

    function showBanner(type, message) {
        $banner.removeClass('success error loading')
            .addClass(type)
            .html(message)
            .slideDown(200);
    }

    // 1. Generate Now Trigger
    $btnGenerate.on('click', function (e) {
        e.preventDefault();
        var origText = $btnGenerate.html();
        $btnGenerate.prop('disabled', true).html('<span class="dashicons dashicons-update spin"></span> <span>Consulting Gemini AI &amp; Publishing...</span>');
        showBanner('loading', '<strong>Architecting Content:</strong> Gemini AI is generating a tailored monograph and downloading featured imagery. Please hold...');

        $.ajax({
            url: aureoAIAdmin.ajaxUrl,
            type: 'POST',
            data: {
                action: 'aureo_ai_generate_now',
                nonce: aureoAIAdmin.nonce
            },
            success: function (res) {
                $btnGenerate.prop('disabled', false).html(origText);
                if (res.success) {
                    showBanner('success', '<strong>Success!</strong> ' + res.data.message + ' — <a href="' + res.data.viewUrl + '" target="_blank" style="color:#047857;text-decoration:underline;">View Live Post</a> | <a href="' + res.data.editUrl + '" target="_blank" style="color:#047857;text-decoration:underline;">Edit in WP</a>');
                    setTimeout(function () { location.reload(); }, 2500);
                } else {
                    showBanner('error', '<strong>Error:</strong> ' + res.data.message);
                }
            },
            error: function () {
                $btnGenerate.prop('disabled', false).html(origText);
                showBanner('error', '<strong>Network Error:</strong> The request timed out or failed.');
            }
        });
    });

    // 2. Test Key Trigger
    $btnTest.on('click', function (e) {
        e.preventDefault();
        var key = $('#aureo_ai_gemini_api_key').val();
        var origText = $btnTest.text();
        $btnTest.prop('disabled', true).text('Testing...');

        $.ajax({
            url: aureoAIAdmin.ajaxUrl,
            type: 'POST',
            data: {
                action: 'aureo_ai_test_connection',
                nonce: aureoAIAdmin.nonce,
                api_key: key
            },
            success: function (res) {
                $btnTest.prop('disabled', false).text(origText);
                if (res.success) {
                    showBanner('success', '<strong>Verified:</strong> ' + res.data.message);
                } else {
                    showBanner('error', '<strong>API Key Failure:</strong> ' + res.data.message);
                }
            },
            error: function () {
                $btnTest.prop('disabled', false).text(origText);
                showBanner('error', '<strong>Error:</strong> Could not connect to WordPress AJAX.');
            }
        });
    });

    // 3. Clear Logs Trigger
    $btnClearLogs.on('click', function (e) {
        e.preventDefault();
        if (!confirm('Clear all generation history logs?')) return;

        $.ajax({
            url: aureoAIAdmin.ajaxUrl,
            type: 'POST',
            data: {
                action: 'aureo_ai_clear_logs',
                nonce: aureoAIAdmin.nonce
            },
            success: function () {
                $('#aureo-log-container').html('<p class="aureo-empty-text">Logs cleared.</p>');
            }
        });
    });
});
