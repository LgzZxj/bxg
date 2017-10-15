define(["jquery", "ckeditor"], function($, CKEDITOR){
    $(function(){
        //富文本编辑器插件的使用
        CKEDITOR.replace("tc_introduce", {
            toolbarGroups: [
                { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
                // { name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
                { name: 'links' },
                { name: 'insert' },
                // { name: 'forms' },
                // { name: 'tools' },
                { name: 'document',    groups: [ 'mode', 'document', 'doctools' ] },
                // { name: 'others' },
               
                { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
                { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
                // { name: 'styles' },
                // { name: 'colors' },
                // { name: 'about' }
            ]
        });
    })
})