<template>
  <v-card class="stock-table mb-6" elevation="4">
    <v-card-title class="d-flex align-center">
      <v-icon color="primary" class="mr-2">mdi-table</v-icon>
      {{ $t('stocks.title') }}
      <v-spacer></v-spacer>
      <v-switch
        v-model="stockStore.autoUpdate"
        :label="$t('stocks.autoUpdate')"
        hide-details
        density="compact"
        class="mr-4"
      ></v-switch>
      <v-btn
        icon="mdi-refresh"
        variant="text"
        :loading="updating"
        @click="manualUpdate"
      ></v-btn>
    </v-card-title>
    <v-card-subtitle>{{ $t('stocks.subtitle') }}</v-card-subtitle>
    <v-card-text class="pa-0">
      <v-table>
        <thead>
          <tr>
            <th class="text-left">{{ $t('stocks.symbol') }}</th>
            <th class="text-left">{{ $t('stocks.company') }}</th>
            <th class="text-right">{{ $t('stocks.price') }}</th>
            <th class="text-right">{{ $t('stocks.change') }}</th>
            <th class="text-right">{{ $t('stocks.marketCap') }}</th>
            <th class="text-right hidden-sm-and-down">{{ $t('stocks.volume') }}</th>
            <th class="text-right hidden-md-and-down">{{ $t('stocks.pe') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="stock in stockStore.sortedStocks"
            :key="stock.symbol"
            :class="{ 'selected-row': stockStore.selectedStocks.includes(stock.symbol) }"
            @click="selectStock(stock.symbol)"
            class="cursor-pointer"
          >
            <td>
              <div class="d-flex align-center">
                <v-avatar size="32" :color="getStockColor(stock.symbol)" class="mr-2">
                  <span class="text-white text-caption font-weight-bold">
                    {{ stock.symbol[0] }}
                  </span>
                </v-avatar>
                <span class="font-weight-bold">{{ stock.symbol }}</span>
              </div>
            </td>
            <td>
              <div>
                <div class="font-weight-medium">{{ stock.name }}</div>
                <div class="text-caption text-grey">{{ stock.nameZh }}</div>
              </div>
            </td>
            <td class="text-right">
              <span class="text-h6 font-weight-bold">${{ stock.price.toFixed(2) }}</span>
            </td>
            <td class="text-right">
              <v-chip
                :color="stock.change >= 0 ? 'success' : 'error'"
                size="small"
                variant="flat"
              >
                <v-icon start size="14">
                  {{ stock.change >= 0 ? 'mdi-trending-up' : 'mdi-trending-down' }}
                </v-icon>
                {{ stock.change >= 0 ? '+' : '' }}{{ stock.change.toFixed(2) }}
                ({{ stock.changePercent >= 0 ? '+' : '' }}{{ stock.changePercent.toFixed(2) }}%)
              </v-chip>
            </td>
            <td class="text-right">{{ stock.marketCap }}</td>
            <td class="text-right hidden-sm-and-down">{{ stock.volume }}</td>
            <td class="text-right hidden-md-and-down">{{ stock.pe }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="px-4 py-3">
      <v-icon size="small" color="grey" class="mr-2">mdi-clock-outline</v-icon>
      <span class="text-caption text-grey">
        {{ $t('stocks.lastUpdate') }}: {{ formatTime(stockStore.lastUpdate) }}
      </span>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useStockStore } from '@/stores/stocks'

const stockStore = useStockStore()
const updating = ref(false)
let updateInterval: number | null = null

const getStockColor = (symbol: string) => {
  const colors: Record<string, string> = {
    NVDA: '#76b900',
    AAPL: '#555555',
    GOOGL: '#4285f4',
    MSFT: '#00a4ef',
    AMZN: '#ff9900'
  }
  return colors[symbol] || 'primary'
}

const selectStock = (symbol: string) => {
  stockStore.selectStock(symbol)
}

const manualUpdate = () => {
  updating.value = true
  stockStore.updateStockPrices()
  setTimeout(() => {
    updating.value = false
  }, 500)
}

const formatTime = (date: Date) => {
  return new Date(date).toLocaleTimeString()
}

onMounted(() => {
  updateInterval = window.setInterval(() => {
    if (stockStore.autoUpdate) {
      stockStore.updateStockPrices()
    }
  }, 30000) // Update every 30 seconds
})

onUnmounted(() => {
  if (updateInterval) {
    clearInterval(updateInterval)
  }
})
</script>

<style scoped>
.stock-table {
  border-radius: 16px;
}

.selected-row {
  background-color: rgba(102, 126, 234, 0.1);
}

.cursor-pointer {
  cursor: pointer;
}

tr:hover {
  background-color: rgba(0, 0, 0, 0.03);
}
</style>
