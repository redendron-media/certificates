import { defineField, defineType } from "sanity";

export const certificates = defineType({
    name:'certificates',
    title:'Certificates',
    type:'document',
    fields: [
        defineField({
            name:'serial',
            type:'string',
            title: 'Serial No'
        }),
        defineField({
            name:'name',
            type:'string',
            title: 'Name'
        }),
        defineField({
            name:'district',
            type:'string',
            title: 'district'
        }),
        defineField({
            name:'udyam',
            type:'string',
            title: 'Udyam No'
        }),
        defineField({
            name:'days',
            type:'string',
            title: 'No of days'
        }),
        defineField({
            name:'training',
            type:'string',
            title: 'Training on'
        }),
        defineField({
            name:'institute',
            type:'string',
            title: 'Training Institute Name'
        }),
        defineField({
            name:'address',
            type:'string',
            title: 'Training Institute Address'
        }),
        defineField({
            name:'from',
            type:'string',
            title: 'From'
        }),
        defineField({
            name:'to',
            type:'string',
            title: 'To'
        }),
        defineField({
            name:'link',
            type:'string',
            title: 'Link'
        }),
    ]
})