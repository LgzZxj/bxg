require.config({
    baseUrl: "/views/assets",
    paths: {
        "jquery": "jquery/jquery",
        "cookie": "jquery-cookie/jquery.cookie",
        "template": "artTemplate/template-web",
        "form": "jquery-form/jquery.form",
        "bootstrap": "bootstrap/js/bootstrap",
        "utils": "../static/lib/utils"
    },
    shim: {
        "bootstrap": {
            deps: ["jquery"]
        }
    }
})