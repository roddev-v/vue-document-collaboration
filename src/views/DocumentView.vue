
<template>
    <PageWrapper>

    </PageWrapper>
</template>

<script setup lang="ts">
import PageWrapper from '@/components/PageWrapper.vue';
import { ContentService } from '@/services/content.service';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

onMounted(async () =>  {
    const route = useRouter();
    const documentId = route.currentRoute.value.params.id as string;
    await ContentService.get(documentId);
})

</script>