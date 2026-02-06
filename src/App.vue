<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar color="primary" elevation="2">
      <v-app-bar-title class="d-flex align-center">
        <v-icon size="32" class="mr-2">mdi-chart-areaspline</v-icon>
        <span class="font-weight-bold">{{ $t('nav.title') }}</span>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      
      <!-- Language Switch -->
      <v-btn
        variant="text"
        color="white"
        @click="toggleLanguage"
        class="text-none"
      >
        <v-icon start>mdi-translate</v-icon>
        {{ locale === 'zh' ? 'English' : '中文' }}
      </v-btn>
    </v-app-bar>

    <!-- Main Content -->
    <v-main class="bg-grey-lighten-4">
      <v-container class="py-6">
        <!-- Page Title -->
        <v-row justify="center" class="mb-6">
          <v-col cols="12" md="10" lg="8" class="text-center">
            <h1 class="text-h3 font-weight-bold text-primary mb-2">
              {{ $t('nav.title') }}
            </h1>
            <p class="text-subtitle-1 text-grey-darken-1">
              Top 5 Tech Giants | 五大科技巨頭
            </p>
          </v-col>
        </v-row>

        <!-- Stock Table -->
        <v-row justify="center">
          <v-col cols="12" md="10" lg="8">
            <StockTable />
          </v-col>
        </v-row>

        <!-- Stock Chart -->
        <v-row justify="center">
          <v-col cols="12" md="10" lg="8">
            <StockChart />
          </v-col>
        </v-row>

        <!-- News Section -->
        <v-row justify="center">
          <v-col cols="12" md="10" lg="8">
            <NewsSection />
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer class="bg-grey-darken-3 text-white py-4">
      <v-container>
        <div class="text-center">
          <p class="text-body-2 mb-1">
            Tech Stock Tracker | 科技股追蹤
          </p>
          <p class="text-caption text-grey-lighten-1">
            Data is simulated for demo purposes | 數據僅供演示用途
          </p>
        </div>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import StockTable from '@/components/StockTable.vue'
import StockChart from '@/components/StockChart.vue'
import NewsSection from '@/components/NewsSection.vue'

const { locale } = useI18n()

const toggleLanguage = () => {
  locale.value = locale.value === 'zh' ? 'en' : 'zh'
  localStorage.setItem('preferred-language', locale.value)
}
</script>

<style>
.bg-grey-lighten-4 {
  background-color: #f5f5f5;
}
</style>
