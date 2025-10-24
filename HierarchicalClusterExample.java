package Cau6;

import weka.clusterers.HierarchicalClusterer;
import weka.core.Instances;
import weka.core.converters.ConverterUtils.DataSource;
import weka.filters.Filter;
import weka.filters.unsupervised.attribute.NominalToBinary;
import weka.filters.unsupervised.attribute.ReplaceMissingValues;

public class HierarchicalClusterExample {
    public static void main(String[] args) {
        try {
            // 1. Đọc dữ liệu từ file .arff
            DataSource source = new DataSource("C://Users//Hoang//Downloads//HNH_Adult.arff");
            Instances data = source.getDataSet();

            // 2. Xử lý giá trị bị thiếu
            ReplaceMissingValues rmv = new ReplaceMissingValues();
            rmv.setInputFormat(data);
            Instances cleanData = Filter.useFilter(data, rmv);

            // 3. Chuyển các thuộc tính danh mục (nominal) sang nhị phân (numeric)
            NominalToBinary ntb = new NominalToBinary();
            ntb.setInputFormat(cleanData);
            Instances newData = Filter.useFilter(cleanData, ntb);

            // 4. Tạo bộ phân cụm HierarchicalClusterer
            HierarchicalClusterer hc = new HierarchicalClusterer();
            hc.setNumClusters(2); // số cụm = 2
            hc.setOptions(new String[]{"-L", "SINGLE"}); // kiểu liên kết SINGLE LINK

            // 5. Huấn luyện mô hình
            hc.buildClusterer(newData);

            // 6. In kết quả
            System.out.println("=== KẾT QUẢ PHÂN CỤM HIERARCHICAL CLUSTERING ===");
            System.out.println("Số cụm: " + hc.getNumClusters());
            System.out.println(hc);

            // 7. Đếm số lượng mẫu trong mỗi cụm
            int[] counts = new int[hc.getNumClusters()];
            for (int i = 0; i < newData.numInstances(); i++) {
                int cluster = hc.clusterInstance(newData.instance(i));
                counts[cluster]++;
            }

            for (int i = 0; i < counts.length; i++) {
                System.out.println("Số phần tử thuộc cụm " + i + ": " + counts[i]);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}