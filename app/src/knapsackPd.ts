interface Item {
    weight: number;
    value: number;
    name: string;
  }
  
  interface KnapsackResult {
    maxValue: number;
    totalWeight: number;
    selectedItems: Item[]
  }
  
  export default function knapsack(items: Item[], capacity: number): KnapsackResult {
    const n = items.length;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const dp: number[][] = new Array(n + 1);
  
    for (let i = 0; i <= n; i++) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      dp[i] = new Array(capacity + 1).fill(0);
    }
  
    for (let i = 1; i <= n; i++) {
      const { weight, value } = items[i - 1];
      for (let w = 1; w <= capacity; w++) {
        if (weight <= w) {
          dp[i][w] = Math.max(dp[i - 1][w], value + dp[i - 1][w - weight]);
        } else {
          dp[i][w] = dp[i - 1][w];
        }
      }
    }
  
    let maxValue = dp[n][capacity];
    let totalWeight = 0;
    let remainingCapacity = capacity;
    const selectedItems: Item[] = [];
  
    for (let i = n; i > 0 && maxValue > 0; i--) {
      if (maxValue !== dp[i - 1][remainingCapacity]) {
        const item = items[i - 1];
        selectedItems.push(item);
        totalWeight += item.weight;
        maxValue -= item.value;
        remainingCapacity -= item.weight;
      }
    }
  
    return { maxValue: dp[n][capacity], totalWeight, selectedItems };
  }