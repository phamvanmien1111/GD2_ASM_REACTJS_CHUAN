import { useState, useEffect } from "react";
import { getStatistics } from "../services/orderService";

interface ProductStats {
  _id: string;
  totalQuantitySold: number;
  totalRevenue: number;
}

interface StatisticsData {
  revenue: number;
  topSellingProducts: ProductStats[];
  hasData: boolean;
}

export const useStatistics = () => {
  const [stats, setStats] = useState<StatisticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getStatistics();
        setStats(data);
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading };
};
