import { Component, Vue } from 'vue-property-decorator';

import Modal from '../modal/modal.vue';

@Component({
    components: {
        Modal,
    }
})
export default class ImageSelector extends Vue {

    public sampleImages = [
        {
            filename: 'color.jpg',
        },
        {
            filename: 'starry.jpg',
        },
        {
            filename: 'terrace.jpg',
        },
    ];

    public getPathToImage(image: any) {
        return `./example-images/${image.filename}`;
    }
    
    public selectImage(image: any) {
        this.$emit('selectedImage', this.getPathToImage(image));
        this.$emit('close');
    }

    public close() {
        this.$emit('close');
    }

    uploadImage() {
        if ((document.querySelector('input[type=file]') as any)) {
            const file = (document.querySelector('input[type=file]') as any)!.files[0];
            const reader = new FileReader();
    
            if (file) reader.readAsDataURL(file); 
    
            reader.onloadend = () => {
                this.$emit('selectedImage', reader.result);
                this.$emit('close');
            } 
        }
    }
}
